const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { click, wait, type, waitNewPage, waitUntil } = require("../../utils/page")

puppeteer.use(StealthPlugin())

module.exports = async function getToken() {
    const browser = await puppeteer.launch({ headless: false })

    const page = await browser.newPage()

    await page.goto('https://my.bible.com/pt/sign-in', waitUntil)
    await click(page, '#googleSigninButton')

    const popup = await waitNewPage(browser, "#identifierId")

    await type(popup, "#identifierId", process.env.EMAIL)
    await click(popup, "#identifierNext");

    await type(popup, "input[name='password']", process.env.PASSWORD)
    await click(popup, "#passwordNext");

    await wait(page, "img[alt='avatar']")

    const { access_token, token_type } = await page.evaluate(() => JSON.parse(localStorage.getItem('YouVersion:OAuth')))

    await browser.close()

    return {
        token: `${token_type} ${access_token}`
    }
}