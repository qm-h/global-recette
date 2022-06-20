import { Container } from '@nextui-org/react'
import LoginForm from './components/auth/AuthForm'
import RegisterForm from './components/auth/register/RegisterForm'
import { useAppContext } from '../lib/context/Context'
import { useState } from 'react'

const LoginPage = () => {
    const [noAccount, setNoAccount] = useState<boolean>(false)
    const { setIsAuthenticated, setUser } = useAppContext()

    const handleSetNoAccount = (val: boolean) => setNoAccount(val)
    return (
        <Container
            css={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                h: '100vh',
                w: '100%',
            }}
        >
            {!noAccount ? (
                <LoginForm
                    userHasAuthenticated={setIsAuthenticated}
                    noAccount={handleSetNoAccount}
                    setUser={setUser}
                />
            ) : (
                <RegisterForm noAccount={handleSetNoAccount} />
            )}
        </Container>
    )
}

export default LoginPage
