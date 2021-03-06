import './App.css'

import { AppContext } from './utils/context/AppContext'
import Cookie from 'js-cookie'
import CustomsRoutes from './routes'
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

    const [avatarIsChanged, setAvatarIsChanged] = useState<boolean>(false)

    return (
        <>
            <HeaderCommon
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
                setUserUUID={setUserUUID}
                user={user}
                setUser={setUser}
                avatarIsChanged={avatarIsChanged}
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
                    avatarIsChanged,
                    setAvatarIsChanged,
                }}
            >
                <CustomsRoutes />
            </AppContext.Provider>
        </>
    )
}

export default App
