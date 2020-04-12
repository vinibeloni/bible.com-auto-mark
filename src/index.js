const puppeteer = require('puppeteer')
require('dotenv').config({path: __dirname + '/../.env'})

const NVI = 129

const url = (version, book, chapter) => `https://www.bible.com/pt/bible/${version}/${book}.${chapter}`;

const verses = [
    {
        version: NVI,
        book: "rom",
        chapter: 10,
        verse: 1,
        tags: ['b']
    },
    {
        version: NVI,
        book: "deu",
        chapter: 7,
        verse: 2,
        tags: ['a']
    }
]

const wait = async (page, selector) => {
    await page.waitForSelector(selector)
    return page.waitFor(500)
}

const click = async (page, id) => {
    await wait(page, id)
    return page.click(id)
}

const type = async (page, id, txt, opts) => {
    await wait(page, id)
    return page.type(id, txt, opts)
}

const waitNewPage = async (browser, id) => {
    return new Promise(resolve => browser.once('targetcreated', async target => {
        const newPage = await target.page();
        await newPage.waitFor(id)

        resolve(newPage)
    }))
}

(async () => {
    debugger

    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    const waitUntil = { waitUntil: 'networkidle2' };

    await signIn()

    for (let i in verses) {
        await saveVerse(verses[i])
    }

    await page.waitFor(7000)

    await browser.close()

    async function signIn() {
        await page.goto('https://my.bible.com/pt/sign-in', waitUntil)
        await click(page, '#googleSigninButton')

        const popup = await waitNewPage(browser, "#identifierId")

        await type(popup, "#identifierId", process.env.EMAIL)
        await click(popup, "#identifierNext");

        await type(popup, "input[name='password']", process.env.PASSWORD)
        await click(popup, "#passwordNext");

        await wait(page, "img[alt='avatar']")
    }

    async function saveVerse({ version, book, chapter, verse, tags }) {
        await page.goto(url(version, book, chapter), waitUntil)

        await click(page, `span[class="verse v${verse}"`)

        await click(page, "div[class='verse-action-footer open'] > .yv-button-bar > div:nth-child(3)")

        for (let i in tags) {
            await type(page, ".card-footer input", tags[i])
            await page.evaluate(() => { document.querySelector(".card-footer input").value = '' })
            await page.keyboard.down('Enter')
        }

        await click(page, ".color-trigger-button")
        await page.evaluate(() => { document.querySelectorAll('.color.color-ffcaf7')[1].click() })
        await click(page, ".solid-button.green")
    }
})()