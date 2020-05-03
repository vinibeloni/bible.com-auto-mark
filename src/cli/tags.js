const { prompt } = require('inquirer')
const repeat = require('../utils/repeat')

module.exports = async () => await repeat(async breakLoop => {
  const { tag } = await prompt([{
    type: 'input',
    message: 'Adicionar Tags',
    name: 'tag'
  }])

  return tag || breakLoop()
})
