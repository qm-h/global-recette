import { Grid, Text, useTheme } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import DeleteAccount from './components/userSettings/DeleteAccount'
import { SuccessAuthUser } from '../../../server/src/shared/types'
import ThemeSwitch from './components/userSettings/ThemeSwitch'
import UpdateEmail from './components/userSettings/UpdateEmail'
import UpdatePassword from './components/userSettings/UpdatePassword'
import checkField from '../utils/auth/checkField'
import { deleteAccount } from '../router/authRouter'
import { isMobile } from 'react-device-detect'
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
        <Grid.Container gap={!isMobile && 4} alignItems="center">
            <Grid
                xs={12}
                md={12}
                lg={12}
                css={{
                    mt: isMobile ? '$13' : '',
                    mb: isMobile ? '$5' : '',
                }}
                justify="center"
            >
                <Text h2={!isMobile} h3={isMobile}>
                    Paramètres
                </Text>
            </Grid>
            <Grid
                xs={12}
                md={2}
                lg={2}
                css={{ mb: isMobile ? '$10' : '' }}
                justify="center"
            >
                <ThemeSwitch
                    isMobile={isMobile}
                    isDark={isDark}
                    setTheme={setTheme}
                />
            </Grid>
            <Grid
                xs={12}
                md={3}
                lg={3}
                css={{ mb: isMobile ? '$10' : '' }}
                justify="center"
            >
                <UpdateEmail isMobile={isMobile} isDark={isDark} />
            </Grid>
            <Grid
                xs={12}
                md={3}
                lg={3}
                css={{ mb: isMobile ? '$10' : '' }}
                justify="center"
            >
                <UpdatePassword isMobile={isMobile} isDark={isDark} />
            </Grid>
            <Grid
                xs={12}
                md={12}
                lg={12}
                css={{ mb: isMobile ? '$10' : '' }}
                justify="center"
            >
                <DeleteAccount
                    isMobile={isMobile}
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
