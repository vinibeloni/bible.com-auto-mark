const { prompt, Separator } = require('inquirer')

const option = (name, value) => { return { name, value, checked: true } }

module.exports = async () => {
    const choices = [
        new Separator('-- Português (Brasil) --'),
        option('NVI', '129'),
        option('ARA', '1608'),
        option('NAA', '1840'),
    ]
    const anwser = await prompt([{
        type: 'checkbox',
        name: 'versions',
        message: 'Seleciona as versão da Bíblia (Todas)',
        choices
    }])

    return anwser.versions
}
