import UserMenu from './UserMenu'
import { Avatar, Link, Tooltip } from '@nextui-org/react'
import { FaDoorOpen } from 'react-icons/fa'
import { SuccessAuthUser as UserType } from '../../../../../../server/src/shared/types'
import { NavigateFunction } from 'react-router-dom'

interface MenuComponentProps {
    isAuthenticated: boolean
    setUser: (user: UserType) => void
    setUserUUID: (uuid: string) => void
    avatarIsChanged: boolean
    userProfile: UserType
    setIsAuthenticated: (val: boolean) => void
    isDark: boolean
    navigate: NavigateFunction
}

const MenuComponent = ({
    isAuthenticated,
    setUser,
    setUserUUID,
    userProfile,
    setIsAuthenticated,
    isDark,
    navigate,
}: MenuComponentProps) => {
    return (
        <>
            {isAuthenticated ? (
                <UserMenu
                    navigate={navigate}
                    isAuthenticated={isAuthenticated}
                    isDark={isDark}
                    setIsAuthenticated={setIsAuthenticated}
                    setUser={setUser}
                    setUserUUID={setUserUUID}
                    user={userProfile}
                />
            ) : (
                <Link animated href="/login" color="success">
                    <Tooltip
                        content={'Connexion'}
                        hideArrow
                        placement="left"
                        shadow
                        rounded
                        color="success"
                    >
                        <Avatar
                            squared
                            pointer
                            color="success"
                            icon={<FaDoorOpen color="#FFF" size="1em" />}
                        />
                    </Tooltip>
                </Link>
            )}
        </>
    )
}

export default MenuComponent
