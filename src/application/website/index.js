const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { click, wait, type, waitNewPage, waitUntil } = require("../../utils/page")

puppeteer.use(StealthPlugin())

module.exports = async (user, data, execute) => {
    const browser = await puppeteer.launch({ headless: false })

    const page = await browser.newPage()

    await page.goto('https://my.bible.com/pt/sign-in', waitUntil)
    await click(page, '#googleSigninButton')

    const popup = await waitNewPage(browser, "#identifierId")

    await type(popup, "#identifierId", user.email)
    await click(popup, "#identifierNext");

    await type(popup, "input[name='password']", user.password)
    await click(popup, "#passwordNext");

    await wait(page, "img[alt='avatar']")

    // const { access_token, token_type } = await page.evaluate(() => JSON.parse(localStorage.getItem('YouVersion:OAuth')))
    // const token = `${token_type} ${access_token}`

    await page.setRequestInterception(true);

    page.on('request', interceptedRequest => {
        var request = {
            'method': 'POST',
            'postData': JSON.stringify(data),
            headers: {
                ...interceptedRequest.headers(),
                "content-type": "application/json"
            }
        };

        interceptedRequest.continue(request);
    });

    const response = await page.goto('https://nodejs.bible.com/api_auth/moments/create/3.1', waitUntil);

    const responseBody = await response.text();

    await execute(responseBody)

    await browser.close()
}