require('dotenv').config({ path: __dirname + '../.env' })
const program = require('commander')
const { prompt, registerPrompt } = require('inquirer')
const books = require('../books.json')

registerPrompt('search-list', require('inquirer-search-list'));

program
    .version('0.0.1')
    .description('bible.com auto mark')

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

const validate = maxValue => answer => !isNaN(answer) && answer <= maxValue

const selectChapter = async book => {
    const lastChapter = book.chapters.length;

    const questions = [{
        type: 'input',
        name: 'chapter',
        message: `Selecione o Capítulo (1 à ${lastChapter})`,
        validate: validate(lastChapter)
    }]

    const answer = await prompt(questions)
    return parseInt(answer.chapter)
}

const selectVerse = async (book, chapterNumber) => {
    const lastVerse = book.chapters[chapterNumber]

    const questions = [{
        type: 'input',
        name: 'verse',
        message: `Selecione o Versículo (1 à ${lastVerse})`,
        validate: validate(lastVerse)
    }]

    const answer = await prompt(questions)
    return parseInt(answer.verse)
}

program
    .command('mark <color>')
    .action(async color => {
        const book = await selectBook()
        const chapterNumber = await selectChapter(book)
        const verse = await selectVerse(book, chapterNumber)

        console.log(book.name + '-' + chapterNumber + ':' + verse)
    })

program.parse(['mark', 'pink'], { from: 'user' })