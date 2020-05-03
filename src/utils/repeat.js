module.exports = async (question) => {
    const response = []
    let repeat = true

    const breakLoop = () => repeat = false

    while (repeat) {
        const anwser = await question(breakLoop)
        if (anwser) response.push(anwser)
    }

    return response
}
