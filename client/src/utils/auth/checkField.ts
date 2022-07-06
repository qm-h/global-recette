const passwordRegex = new RegExp(
    '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})'
)

const checkField = {
    emptyField: (field: string, value: string): string | boolean => {
        if (value === '') {
            return `${field} est requis`
        }
        return true
    },
    minLength: (
        field: string,
        value: string,
        minLength: number
    ): string | boolean => {
        if (value.length < minLength) {
            return `Le champ ${field} doit contenir au moins ${minLength} caractères`
        }
        return true
    },
    maxLength: (
        field: string,
        value: string,
        maxLength: number
    ): string | boolean => {
        if (value.length > maxLength) {
            return `Le champ ${field} dois être inférieur à ${maxLength} caractères`
        }
        return true
    },
    email: (value: string): string | boolean => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return `Veuillez entrer une adresse email valide`
        }
        return false
    },
    password: (value: string): string | boolean => {
        if (!passwordRegex.test(value)) {
            return `Il doit contenir au moins 8 caractères une majuscule et un chiffre`
        }
        return false
    },
    confirmPassword: (value: string, password: string): string | boolean => {
        if (value !== password) {
            return `Les mots de passe ne correspondent pas`
        }
        return true
    },
    notHaveSpecialChar: (value: string): string | boolean => {
        if (/[^a-zA-Z0-9]/.test(value)) {
            return ` le champ ne doit pas contenir de caractère spécial ou d'espace`
        }
        return false
    },
}

export default checkField
