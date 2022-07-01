import { Container } from '@nextui-org/react'
import LoginForm from './components/auth/AuthForm'
import RegisterForm from './components/auth/register/RegisterForm'
import { useAppContext } from '../lib/context/context'
import { useState } from 'react'

const AuthPage = () => {
    const [noAccount, setNoAccount] = useState<boolean>(false)
    const { setIsAuthenticated, setUser, setUserUUID } = useAppContext()
    const handleSetNoAccount = (val: boolean) => setNoAccount(val)
    return (
        <Container
            css={{
                h: '100vh',
                w: '90%',
            }}
            display="flex"
            justify="center"
            alignItems="center"
            responsive
        >
            {!noAccount ? (
                <LoginForm
                    setIsAuthenticated={setIsAuthenticated}
                    noAccount={handleSetNoAccount}
                    setUser={setUser}
                    setUserUUID={setUserUUID}
                />
            ) : (
                <RegisterForm noAccount={handleSetNoAccount} />
            )}
        </Container>
    )
}

export default AuthPage
