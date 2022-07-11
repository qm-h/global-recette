import { Dropdown, Text, User, useTheme } from '@nextui-org/react'

import { Key } from 'react'
import { SuccessAuthUser as UserType } from '../../../../../../server/src/shared/types'
import { logout } from '../../../../utils/auth/logout'
import { toasterSuccessLogout } from '../../../../utils/theme/toaster'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../../../../router/authRouter'

interface Props {
    user: UserType
    setUser: (user: UserType) => void
    setIsAuthenticated: (val: boolean) => void
    setUserUUID: (uuid: string) => void
}

const UserMenu = ({
    user,
    setUser,
    setIsAuthenticated,
    setUserUUID,
}: Props) => {
    const { isDark } = useTheme()
    const navigate = useNavigate()

    const handleMenu = async (key: Key) => {
        switch (key) {
            case 'sign_out':
                await userLogout(user.id).then(() => {
                    logout(setUser, setIsAuthenticated, setUserUUID)
                    setIsAuthenticated(false)
                    toasterSuccessLogout(isDark)
                    navigate('/')
                })
                break
            case 'profile':
                navigate(`/profile`)
                break
            case 'settings':
                navigate(`/settings`)
                break
            default:
                break
        }
        if (key === 'sign_out') {
        }
    }

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
                onAction={(key: Key) => handleMenu(key)}
                color="success"
                css={{
                    minWidth: '300px',
                    borderRadius: '$lg',
                    padding: '$sm',
                }}
                disabledKeys={['help']}
                aria-label="User Actions"
            >
                <Dropdown.Section title="Compte">
                    <Dropdown.Item textValue={'email'} key="profile">
                        <Text b color="inherit" css={{ d: 'flex' }}>
                            {user && user.email}
                        </Text>
                    </Dropdown.Item>
                </Dropdown.Section>
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
                        Sign Out
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserMenu
