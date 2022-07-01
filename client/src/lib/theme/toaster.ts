import { toast } from 'react-hot-toast'

const toasterSuccessAuth = (dark: boolean) => {
    switch (dark) {
        case true:
            toast.success('Vous êtes connecté !', {
                icon: '👏',
                duration: 5000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        default:
            toast.success('Vous êtes connecté !', {
                icon: '👏',
                duration: 5000,
            })
            break
    }
}

const toasterUserNotFound = (dark: boolean) => {
    switch (dark) {
        case true:
            toast.error('Email ou Mot de passe incorrect !', {
                icon: '😥',
                duration: 5000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        default:
            toast.error('Email ou Mot de passe incorrect !', {
                icon: '😥',
                duration: 5000,
            })
            break
    }
}

const toasterErrorAuth = (dark: boolean) => {
    switch (dark) {
        case true:
            toast.error('Une erreur est survenue !', {
                icon: '💀',
                duration: 5000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        default:
            toast.error('Une erreur est survenue !', {
                icon: '💀',
                duration: 5000,
            })
            break
    }
}

const toasterSuccessCommon = (dark: boolean, message: string) => {
    switch (dark) {
        case true:
            toast.success(message, {
                icon: '👏',
                duration: 5000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        default:
            toast.success(message, {
                icon: '👏',
                duration: 5000,
            })
            break
    }
}

const toasterErrorCommon = (dark: boolean, message: string) => {
    switch (dark) {
        case true:
            toast.error(message, {
                duration: 3000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        default:
            toast.error(message, {
                duration: 3000,
            })
            break
    }
}

const toasterSuccessLogout = (dark: boolean) => {
    switch (dark) {
        case true:
            toast.success('Vous êtes déconnecté !', {
                icon: '😢',
                duration: 5000,
                style: {
                    background: '#333',
                    color: '#fff',
                },
            })
            break
        default:
            toast.success('Vous êtes déconnecté !', {
                icon: '😢',
                duration: 5000,
            })
            break
    }
}

export {
    toasterSuccessAuth,
    toasterErrorAuth,
    toasterSuccessLogout,
    toasterUserNotFound,
    toasterErrorCommon,
    toasterSuccessCommon,
}
