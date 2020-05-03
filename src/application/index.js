const { getLocalDate } = require('../utils/date')
const axios = require('axios')
const executeBrowser = require('./website')

module.exports = async (verses, color, tags, versions, user) => {
    const references = versions.map(v => {
        return {
            usfm: verses.map(v => v.id),
            version_id: v
        }
    })

    const data = {
        kind: "bookmark",
        references,
        labels: tags,
        created_dt: getLocalDate(new Date()),
        content: null,
        user_status: "private",
        color
    }

    await executeBrowser(user, data, async response => {
        debugger
    })
}