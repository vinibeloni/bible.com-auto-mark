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

const waitUntil = { waitUntil: 'networkidle2' };

module.exports = {
    wait, click, type, waitNewPage, waitUntil
}