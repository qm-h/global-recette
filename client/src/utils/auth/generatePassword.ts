const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const passwordLength = 12

const generatePassword = () => {
    let password = ''
    for (let i = 0; i < passwordLength; i++) {
        password += chars[Math.floor(Math.random() * chars.length)]
    }
    return password
}

export default generatePassword
