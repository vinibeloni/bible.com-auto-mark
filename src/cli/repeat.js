const { prompt } = require('inquirer')

module.exports = async () => {
    const anwser = await prompt([{
        type: 'confirm',
        name: 'repeat',
        message: 'Deseja marcar mais?'
    }])

    if (anwser.repeat) process.stdout.write('\033c');

    return anwser.repeat
}
