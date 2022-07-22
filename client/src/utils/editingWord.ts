const firstLetterToUpperCase = (word: string): string => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const allLetterToUpperCase = (word: string): string => {
    return word.toUpperCase()
}

const allLetterToLowerCase = (word: string): string => {
    return word.toLowerCase()
}

export { firstLetterToUpperCase, allLetterToUpperCase, allLetterToLowerCase }
