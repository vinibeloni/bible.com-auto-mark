const { getLocalDate } = require('../../utils/date')

module.exports = {
    saveVerseRequest: (verses, tags, version, color) => {
        return {
            kind: "bookmark",
            references: [{
                usfm: verses,
                version_id: version
            }],
            labels: tags,
            created_dt: getLocalDate(new Date()),
            content: null,
            user_status: "private",
            color
        }
    }
}