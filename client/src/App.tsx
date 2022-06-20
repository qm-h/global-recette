import './App.css'

import { AppContext } from './lib/context/Context'
import CustomsRoutes from './Routes'
import HeaderCommon from './pages/components/common/HeaderCommon'
import { Toaster } from 'react-hot-toast'
import { User } from '../../server/src/shared/types'
import { useState } from 'react'

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<User>()

    return (
        <>
            <HeaderCommon
                isAuthenticated={isAuthenticated}
                userHasAuthenticated={setIsAuthenticated}
                user={user}
            />
            <Toaster position="top-center" reverseOrder={true} />
            <AppContext.Provider
                value={{
                    isAuthenticated,
                    setIsAuthenticated,
                    user,
                    setUser,
                }}
            >
                <CustomsRoutes />
            </AppContext.Provider>
        </>
    )
}

export default App
