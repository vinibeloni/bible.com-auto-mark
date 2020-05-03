const booksJson = require('./books.json')
const axios = require('axios')
const cheerio = require('cheerio')

module.exports = async () => {
    const getChapter = async chapter => {
        try {
            const response = await axios.get(`https://www.bible.com/pt/bible/129/${chapter.usfm}.NVI`)
            const $ = cheerio.load(response.data)
            const lastVerse = $('.mw6.center.pa3.pt4.pb7.mt6 .chapter .verse').last()[0].attribs['data-usfm']

            return {
                alias: chapter.usfm,
                number: chapter.human,
                lastVerse: lastVerse.replace(chapter.usfm + '.', '')
            }

        } catch (err) {
            console.log(err)
        }
    }

    const getBook = async bookJson => {
        const promises = []
        for (let c in bookJson.chapters) {
            const chapter = bookJson.chapters[c]

            promises.push(getChapter(chapter))
        }

        const book = {
            name: bookJson.human_long,
            index: booksJson.index,
            chapters: await Promise.all(promises)
        }

        return book
    }

    const promises = []


    for (let i in booksJson) {
        const book = booksJson[i]
        book.index = i
        promises.push(getBook(book))
    }

    const books = await Promise.all(promises)
    return books
}