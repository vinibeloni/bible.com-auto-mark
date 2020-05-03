const booksJson = require('./books.json')
const Books = require('../../data')

module.exports = async () => {
    for (let b in booksJson) {
        const book = booksJson[b]
        const ex = await Books.findOne({ name: { $eq: book.name } })
        if (ex) continue

        try {
            const chapters = book.chapters
                .filter(a => a != null)
                .sort((a, c) => a.number < c.number)

            book.chapters = chapters;
            book.alias = chapters[0].alias.substring(0, 3)

            const model = new Books(book)
            await model.save()
        } catch (err) {
            debugger
            break
        }
    }
}