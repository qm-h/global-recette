import { Key } from 'react'
import { userLogout } from '../router/authRouter'
import { logout } from './auth/logout'
import { toasterSuccessLogout } from './theme/toaster'
import { NavigateFunction } from 'react-router-dom'
import { SuccessAuthUser } from '../../../server/src/shared/types'

const handleMenu = async (
    key: Key,
    navigate: NavigateFunction,
    user: SuccessAuthUser,
    setUser: (user: SuccessAuthUser) => void,
    setIsAuthenticated: (val: boolean) => void,
    setUserUUID: (uuid: string) => void,
    isDark: boolean
) => {
    switch (key) {
        case 'home':
            navigate('/')
            break
        case 'recipe':
            navigate('/mes-recettes')
            break
        case 'favorite':
            navigate('/mes-favoris')
            break
        case 'sign_out':
            await userLogout(user.id).then(() => {
                logout(setUser, setIsAuthenticated, setUserUUID)
                setIsAuthenticated(false)
                toasterSuccessLogout(isDark)
                navigate('/')
            })
            break
        case 'profile':
            navigate(`/profile`)
            break
        case 'settings':
            navigate(`/settings`)
            break
        default:
            break
    }
}

export default handleMenu
