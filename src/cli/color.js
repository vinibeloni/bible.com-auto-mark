const { prompt } = require('inquirer')

const option = (name, value) => { return { name, value } }

module.exports = async () => {
    const choices = [
        option('red', 'eb4f34'),
        option('green', '53b054'),
        option('yellow', 'd9d75f'),
    ]
    const anwser = await prompt([{
        type: 'rawlist',
        name: 'color',
        message: 'Seleciona a cor da marcação',
        choices
    }])

    return anwser.color
}
