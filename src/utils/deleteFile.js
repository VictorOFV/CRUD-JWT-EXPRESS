const path = require("node:path")
const fs = require("node:fs")

async function deleteFile(relativePath) {

    if(!relativePath) return 

    const pathFile = path.resolve(relativePath)
    const fileExist = fs.existsSync(pathFile)

    if (!fileExist) return

    fs.unlinkSync(pathFile)
}

module.exports = deleteFile