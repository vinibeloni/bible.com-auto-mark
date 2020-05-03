const { LocalStorage } = require('node-localstorage')
const localStorage = new LocalStorage('./.versicles')

const getItem = key => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : value
}

const setItem = (key, value) => {
    const storedValue = getItem(key)

    if (!storedValue) localStorage.setItem(key, JSON.stringify(value))
}

module.exports = { setItem, getItem }