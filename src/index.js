const program = require('commander')

const selectColor = require('./cli/color')
const selectVersicle = require('./cli/versicles')
const selectVersions = require('./cli/versions')

program
    .version('0.0.1')
    .description('bible.com auto mark')
    .action(async () => {
        const color = await selectColor()
        const versions = await selectVersions()
        const versicles = await selectVersicle()

        console.log([color, versions, versicles])
    })

program.parse([], { from: 'user' })