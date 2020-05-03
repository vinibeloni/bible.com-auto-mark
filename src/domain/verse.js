module.exports =
    function Verse(book, chapter, versicle) {
        this.id = `${book}.${chapter}.${versicle}`
        this.book = book
        this.chapter = chapter
        this.versicle = versicle
    }