const program = require('commander')
const getColor = require('./cli/color')
const getVerse = require('./cli/verse')
const repeat = require('./cli/repeat')

program
    .version('0.0.1')
    .description('bible.com auto mark')
    .action(async () => {
        const color = await getColor()
        const verses = []

        do {
            const verse = await getVerse()
            verses.push(verse)
        }
        while (await repeat())

        console.log(verses)
    })

program.parse([], { from: 'user' })