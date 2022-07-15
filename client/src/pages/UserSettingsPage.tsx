import { Grid, Text, useTheme } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import DeleteAccount from './components/userSettings/DeleteAccount'
import { SuccessAuthUser } from '../../../server/src/shared/types'
import ThemeSwitch from './components/userSettings/ThemeSwitch'
import UpdateEmail from './components/userSettings/UpdateEmail'
import UpdatePassword from './components/userSettings/UpdatePassword'
import checkField from '../utils/auth/checkField'
import { deleteAccount } from '../router/authRouter'
import { logout } from '../utils/auth/logout'
import { toasterErrorCommon } from '../utils/theme/toaster'
import { useAppContext } from '../utils/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useTheme as useNextTheme } from 'next-themes'

const UserSettingsPage = () => {
    const [wantToDeleteAccount, setWantToDeleteAccount] = useState(false)
    const [isInvalidEmail, setIsInvalidEmail] = useState(false)
    const [isInvalidEmailMessage, setIsInvalidEmailMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isInvalidPassword, setIsInvalidPassword] = useState(false)
    const [isInvalidPasswordMessage, setIsInvalidPasswordMessage] = useState('')
    const [isInvalidPasswordConfirmation, setIsInvalidPasswordConfirmation] =
        useState(false)
    const [
        isInvalidPasswordConfirmationMessage,
        setIsInvalidPasswordConfirmationMessage,
    ] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { isDark } = useTheme()
    const { setTheme } = useNextTheme()
    const { user, userUUID, setIsAuthenticated, setUserUUID, setUser } =
        useAppContext()
    const authUser: SuccessAuthUser = user
    const navigate = useNavigate()

    const handleDeleteAccount = async (email) => {
        const resultEmail = checkField.deleteEmail(authUser.email, email)
        if (typeof resultEmail === 'string') {
            setIsInvalidEmail(true)
            setIsInvalidEmailMessage(resultEmail)
        }
        typeof resultEmail === 'boolean' && setIsInvalidEmail(resultEmail)
        if (isInvalidEmail === false) {
            setIsLoading(true)
            await deleteAccount(authUser.id, userUUID, email).then(
                async (res) => {
                    setIsLoading(false)
                    if (res.status === 401) {
                        toasterErrorCommon(isDark, 'Une erreur est survenue')
                    } else {
                        logout(setIsAuthenticated, setUser, setUserUUID)
                        toasterErrorCommon(
                            isDark,
                            'Votre compte a été supprimé, \n à bientôt !'
                        )
                        navigate('/')
                    }
                }
            )
        }
    }

    useEffect(() => {
        if (!wantToDeleteAccount) {
            setEmail('')
            setIsInvalidEmail(false)
        }
    }, [wantToDeleteAccount])

    return (
        <Grid.Container gap={4} alignItems="center">
            <Grid md={12} justify="center">
                <Text h2>Paramètres</Text>
            </Grid>
            <Grid md={2} justify="center">
                <ThemeSwitch isDark={isDark} setTheme={setTheme} />
            </Grid>
            <Grid md={3} justify="center">
                <UpdateEmail isDark={isDark} />
            </Grid>
            <Grid md={3} justify="center">
                <UpdatePassword isDark={isDark} />
            </Grid>
            <Grid md={12} justify="center">
                <DeleteAccount
                    authUser={authUser}
                    email={email}
                    isLoading={isLoading}
                    isDark={isDark}
                    handleDeleteAccount={handleDeleteAccount}
                    isInvalidEmail={isInvalidEmail}
                    isInvalidEmailMessage={isInvalidEmailMessage}
                    setEmail={setEmail}
                    wantToDeleteAccount={wantToDeleteAccount}
                    setWantToDeleteAccount={setWantToDeleteAccount}
                />
            </Grid>
        </Grid.Container>
    )
}

export default UserSettingsPage
