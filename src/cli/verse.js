const { prompt, registerPrompt } = require('inquirer')
const books = require('../data/books.json')

registerPrompt('search-list', require('inquirer-search-list'));

const selectBook = async () => {
    const choices = books.map((b, i) => { return { name: b.name, value: i } })

    const questions = [{
        type: 'search-list',
        name: 'book',
        message: 'Selecione o livro',
        choices
    }]

    const answer = await prompt(questions)
    return books[answer.book]
}

const validate = maxValue => answer => answer > 0 && answer <= maxValue

const numericQuestion = async (name, message, validate) => {
    const questions = [{
        type: 'input',
        name,
        message,
        validate
    }]

    const answer = await prompt(questions)
    return parseInt(answer[name])
}

const selectChapter = async book => {
    const lastChapter = book.chapters.length;

    return await numericQuestion(
        'chapter',
        `Selecione o Capítulo (1 à ${lastChapter})`,
        validate(lastChapter))
}

const selectVerse = async (book, chapter) => {
    const lastVerse = book.chapters[chapter]

    return await numericQuestion(
        'verse',
        `Selecione o Versículo (1 à ${lastVerse})`,
        validate(lastVerse))
}

module.exports = async () => {
    const book = await selectBook()
    const chapter = await selectChapter(book)
    const verse = await selectVerse(book, chapter)

    return {
        name: book.alias,
        chapter,
        verse
    }
}