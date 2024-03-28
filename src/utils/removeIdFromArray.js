function removeIdFromArray(array, idToRemove) {
    const arrayIndex = array.findIndex(id => id.toString() === idToRemove.toString())

    if (arrayIndex !== -1) {
        array.splice(arrayIndex, 1)
    }

    return array
}

module.exports = removeIdFromArray