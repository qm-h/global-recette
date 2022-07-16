import { Dropdown, Text, User, useTheme } from '@nextui-org/react'

import { Key } from 'react'
import { SuccessAuthUser as UserType } from '../../../../../../server/src/shared/types'
import { logout } from '../../../../utils/auth/logout'
import { toasterSuccessLogout } from '../../../../utils/theme/toaster'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { userLogout } from '../../../../router/authRouter'
import handleMenu from '../../../../utils/navigation'

interface Props {
    user: UserType
    setUser: (user: UserType) => void
    setIsAuthenticated: (val: boolean) => void
    setUserUUID: (uuid: string) => void
    isDark: boolean
    isAuthenticated: boolean
    navigate: NavigateFunction
}

const UserMenu = ({
    isAuthenticated,
    navigate,
    user,
    setUser,
    setIsAuthenticated,
    setUserUUID,
    isDark,
}: Props) => {
    return (
        <Dropdown placement="top-left">
            <Dropdown.Trigger>
                <User
                    bordered
                    as="button"
                    pointer
                    size="lg"
                    color="primary"
                    squared
                    name={user && `${user.firstname} ${user.lastname}`}
                    description={user && `@${user.username}`}
                    src={
                        user && user.avatar && user.generated_avatar
                            ? user.avatar
                            : user?.generated_avatar
                    }
                />
            </Dropdown.Trigger>
            <Dropdown.Menu
                onAction={(key: Key) =>
                    handleMenu(
                        key,
                        navigate,
                        user,
                        setUser,
                        setIsAuthenticated,
                        setUserUUID,
                        isDark
                    )
                }
                color="success"
                css={{
                    borderRadius: '$lg',
                    padding: '$sm',
                }}
                disabledKeys={['help']}
                aria-label="User Actions"
            >
                <Dropdown.Item textValue={'profile'} key="profile">
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        Profile
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item
                    key="settings"
                    css={{ height: '$12' }}
                    textValue={'Settings'}
                    withDivider
                >
                    Préférences
                </Dropdown.Item>
                <Dropdown.Item
                    textValue={'Help'}
                    css={{ height: '$12' }}
                    key="help"
                >
                    Aide
                </Dropdown.Item>
                <Dropdown.Section>
                    <Dropdown.Item
                        css={{ height: '$12' }}
                        key="sign_out"
                        color="error"
                        textValue={'Sign Out'}
                    >
                        Déconnexion
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserMenu
