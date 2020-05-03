const { prompt, registerPrompt } = require('inquirer')
const Verse = require('../domain/verse')

const books = require('../data/books.json')
const repeat = require('../utils/repeat')
const storage = require('../data/storage')

registerPrompt('search-list', require('inquirer-search-list'));

const selectBook = async () => {
    const choices = books.map((b, i) => { return { name: b.name, value: i } })

    const questions = [{
        type: 'search-list',
        name: 'book',
        message: 'Selecione o livro',
        choices: [...choices, { name: '==Sair==', value: null }]
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

const selectVersicle = async (book, chapter) => {
    const lastVersicle = book.chapters[chapter - 1]

    return await numericQuestion(
        'versicle',
        `Selecione o Versículo (1 à ${lastVersicle})`,
        validate(lastVersicle))
}

module.exports = async () => {
    return await repeat(async breakLoop => {
        const book = await selectBook()

        if (!book) return breakLoop()

        const chapter = await selectChapter(book)
        const versicle = await selectVersicle(book, chapter)

        const verse = new Verse(book.alias, chapter, versicle)

        if (storage.getItem(verse.id)) return

        storage.setItem(verse.id, verse)
        return verse
    })
}