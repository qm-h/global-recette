import './App.css'

import { AppContext } from './lib/context/context'
import Cookie from 'js-cookie'
import CustomsRoutes from './Routes'
import HeaderCommon from './pages/components/common/HeaderCommon'
import { SuccessAuthUser } from '../../server/src/shared/types'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!Cookie.get('user')
    )
    const [user, setUser] = useState<SuccessAuthUser>(
        Cookie.get('user') ? JSON.parse(Cookie.get('user') as string) : null
    )
    const [userUUID, setUserUUID] = useState<string>(
        Cookie.get('userUUID')
            ? JSON.parse(Cookie.get('userUUID') as string)
            : null
    )

    return (
        <>
            <HeaderCommon
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUserUUID={setUserUUID}
                user={user}
                setUser={setUser}
            />
            <Toaster position="top-center" reverseOrder={true} />
            <AppContext.Provider
                value={{
                    isAuthenticated,
                    setIsAuthenticated,
                    user,
                    setUser,
                    userUUID,
                    setUserUUID,
                }}
            >
                <CustomsRoutes />
            </AppContext.Provider>
        </>
    )
}

export default App
