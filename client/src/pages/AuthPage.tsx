import AuthForm from './components/auth/connection/AuthForm'
import { Grid } from '@nextui-org/react'
import RegisterForm from './components/auth/register/RegisterForm'
import checkField from '../utils/auth/checkField'
import { useAppContext } from '../utils/context/AppContext'
import { useState } from 'react'

const AuthPage = () => {
    const [noAccount, setNoAccount] = useState<boolean>(false)
    const [isInvalidUsername, setIsInvalidUsername] = useState<boolean>(false)
    const [isInvalidUsernameMessage, setIsInvalidUsernameMessage] =
        useState<string>('')
    const [isInvalidFirstname, setIsInvalidFirstname] = useState<boolean>(false)
    const [isInvalidFirstnameMessage, setIsInvalidFirstnameMessage] =
        useState<string>('')
    const [isInvalidLastname, setIsInvalidLastname] = useState<boolean>(false)
    const [isInvalidLastnameMessage, setIsInvalidLastnameMessage] =
        useState<string>('')
    const [isInvalidEmail, setIsInvalidEmail] = useState<boolean>(false)
    const [isInvalidEmailMessage, setIsInvalidEmailMessage] =
        useState<string>('')
    const [isInvalidPassword, setIsInvalidPassword] = useState<boolean>(false)
    const [isInvalidPasswordMessage, setIsInvalidPasswordMessage] =
        useState<string>('')
    const [isInvalidForm, setIsInvalidForm] = useState<boolean>(true)

    const { setIsAuthenticated, setUser, setUserUUID } = useAppContext()
    const handleSetNoAccount = (val: boolean) => setNoAccount(val)

    const handleValidation = (fields: string, value: string) => {
        switch (fields) {
            case 'username':
                const resultUsername = checkField.notHaveSpecialChar(value)
                if (typeof resultUsername === 'string') {
                    setIsInvalidUsername(true)
                    setIsInvalidUsernameMessage(resultUsername)
                }
                typeof resultUsername === 'boolean' &&
                    setIsInvalidUsername(resultUsername)
                break
            case 'firstname':
                const resultFirstname = checkField.notHaveSpecialChar(value)
                if (typeof resultFirstname === 'string') {
                    setIsInvalidFirstname(true)
                    setIsInvalidFirstnameMessage(resultFirstname)
                }
                typeof resultFirstname === 'boolean' &&
                    setIsInvalidFirstname(resultFirstname)
                break
            case 'lastname':
                const resultLastname = checkField.notHaveSpecialChar(value)
                if (typeof resultLastname === 'string') {
                    setIsInvalidLastname(true)
                    setIsInvalidLastnameMessage(resultLastname)
                }
                typeof resultLastname === 'boolean' &&
                    setIsInvalidLastname(resultLastname)
                break
            case 'email':
                const resultEmail = checkField.email(value)
                if (typeof resultEmail === 'string') {
                    setIsInvalidEmail(true)
                    setIsInvalidEmailMessage(resultEmail)
                }
                typeof resultEmail === 'boolean' &&
                    setIsInvalidEmail(resultEmail)
                break
            case 'password':
                const resultPassword = checkField.password(value)
                if (typeof resultPassword === 'string') {
                    setIsInvalidPassword(true)
                    setIsInvalidPasswordMessage(resultPassword)
                }
                typeof resultPassword === 'boolean' &&
                    setIsInvalidPassword(resultPassword)
                break
            default:
                return false
        }
    }

    return (
        <Grid.Container justify="center" alignItems="center">
            {!noAccount ? (
                <AuthForm
                    setIsAuthenticated={setIsAuthenticated}
                    noAccount={handleSetNoAccount}
                    handleValidation={handleValidation}
                    setUser={setUser}
                    setUserUUID={setUserUUID}
                    setIsInvalidForm={setIsInvalidForm}
                    setIsInvalidEmail={setIsInvalidEmail}
                    setIsInvalidEmailMessage={setIsInvalidEmailMessage}
                    setIsInvalidPassword={setIsInvalidPassword}
                    setIsInvalidPasswordMessage={setIsInvalidPasswordMessage}
                    isInvalidForm={isInvalidForm}
                    isInvalidEmail={isInvalidEmail}
                    isInvalidEmailMessage={isInvalidEmailMessage}
                    isInvalidPassword={isInvalidPassword}
                    isInvalidPasswordMessage={isInvalidPasswordMessage}
                />
            ) : (
                <RegisterForm
                    noAccount={handleSetNoAccount}
                    handleValidation={handleValidation}
                    setIsInvalidForm={setIsInvalidForm}
                    setIsInvalidUsername={setIsInvalidUsername}
                    setIsInvalidUsernameMessage={setIsInvalidUsernameMessage}
                    setIsInvalidFirstname={setIsInvalidFirstname}
                    setIsInvalidFirstnameMessage={setIsInvalidFirstnameMessage}
                    setIsInvalidLastname={setIsInvalidLastname}
                    setIsInvalidLastnameMessage={setIsInvalidLastnameMessage}
                    setIsInvalidEmail={setIsInvalidEmail}
                    setIsInvalidEmailMessage={setIsInvalidEmailMessage}
                    setIsInvalidPassword={setIsInvalidPassword}
                    setIsInvalidPasswordMessage={setIsInvalidPasswordMessage}
                    isInvalidForm={isInvalidForm}
                    isInvalidEmail={isInvalidEmail}
                    isInvalidEmailMessage={isInvalidEmailMessage}
                    isInvalidPassword={isInvalidPassword}
                    isInvalidPasswordMessage={isInvalidPasswordMessage}
                    isInvalidUsername={isInvalidUsername}
                    isInvalidUsernameMessage={isInvalidUsernameMessage}
                    isInvalidFirstname={isInvalidFirstname}
                    isInvalidFirstnameMessage={isInvalidFirstnameMessage}
                    isInvalidLastname={isInvalidLastname}
                    isInvalidLastnameMessage={isInvalidLastnameMessage}
                />
            )}
        </Grid.Container>
    )
}

export default AuthPage
