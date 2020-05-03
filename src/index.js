const program = require('commander')

const selectColor = require('./cli/color')
const selectVersions = require('./cli/versions')
const selectVerses = require('./cli/verses')
const selectTags = require('./cli/tags')
const getUser = require('./cli/auth')
const saveVerses = require('./application')

program
    .version('0.0.1')
    .description('bible.com auto mark')
    .action(async () => {
        const color = await selectColor()
        const versions = await selectVersions()
        const verses = await selectVerses()
        const tags = await selectTags()
        const user = await getUser()

        await saveVerses(verses, color, tags, versions, user)
    })

program.parse([], { from: 'user' })