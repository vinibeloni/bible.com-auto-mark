const formatISO9075 = require('date-fns/formatISO9075')
const { eo } = require('date-fns/locale')

const getLocalDate = (date) => formatISO9075(date, { locale: eo })

module.exports = {
    getLocalDate
}