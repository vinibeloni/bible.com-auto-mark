const { prompt } = require('inquirer')
const storage = require('../data/storage')

module.exports = async () => {
    const email = storage.getItem('email')

    const questions = [{
        type: 'input',
        message: 'Digite seu e-mail',
        name: 'email',
        default: email
    },
    {
        type: 'password',
        message: 'Digite sua senha',
        name: 'password',
        mask: '*',
        validate: answer => answer != '' && answer != undefined
    }]

    const user = await prompt(questions)

    if (!email) storage.setItem('email', user.email)
    
    return user
}
