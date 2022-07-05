import LoginForm from './components/auth/AuthForm'
import RegisterForm from './components/auth/register/RegisterForm'
import { useAppContext } from '../lib/context/context'
import { useState } from 'react'

const AuthPage = () => {
    const [noAccount, setNoAccount] = useState<boolean>(false)
    const { setIsAuthenticated, setUser, setUserUUID } = useAppContext()
    const handleSetNoAccount = (val: boolean) => setNoAccount(val)
    return (
        <>
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
        </>
    )
}

export default AuthPage
