const axios = require('axios')
const requests = require('./requests')
const getToken = require('./get-token')

const versions = {
    NVI: 129
}

const colors = {
    "devotional": "#fff"
}

const saveVerses = async ({ verses, tags, studyType }) => {
    const token = await getToken()

    const response = await axios.post('https://nodejs.bible.com/api_auth/moments/create/3.1', {
        headers: {
            Authorization: token,
            'content-type': 'application/json',
            data: requests.saveVerseRequest(verses, tags)
        }
    })
}

module.exports = { saveVerses }