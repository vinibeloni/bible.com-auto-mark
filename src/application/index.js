const { getLocalDate } = require('../utils/date')

const axios = require('axios')
const requests = require('./requests')
const getToken = require('./get-token')

const versions = {
    NVI: 129
}

const saveVersicles = async (versicles, color, tags, versions) => {
    const token = await getToken()

    const references = versions.map(v => {
        return {
            usfm: versicles,
            version_id: v
        }
    })

    const response = await axios.post('https://nodejs.bible.com/api_auth/moments/create/3.1', {
        headers: {
            Authorization: token,
            'content-type': 'application/json',
            data: {
                kind: "bookmark",
                references,
                labels: tags,
                created_dt: getLocalDate(new Date()),
                content: null,
                user_status: "private",
                color
            }
        }
    })
}

module.exports = { saveVersicles }