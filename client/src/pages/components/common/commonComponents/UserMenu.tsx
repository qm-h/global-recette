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
    const handleLogout = async (key: Key) => {
        if (key === 'sign_out') {
            await userLogout(user.id).then(() => {
                logout(setUser, setIsAuthenticated, setUserUUID)
                setIsAuthenticated(false)
                toasterSuccessLogout(isDark)
                navigate('/')
            })
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
                    name={`${user.firstname} ${user.lastname}`}
                    description={`@${user.username}`}
                    src={user.avatar}
                />
            </Dropdown.Trigger>
            <Dropdown.Menu
                onAction={(key: Key) => handleLogout(key)}
                color="success"
                css={{
                    minWidth: '300px',
                    borderRadius: '$lg',
                    padding: '$sm',
                }}
                disabledKeys={['help_and_feedback', 'settings']}
                aria-label="User Actions"
            >
                <Dropdown.Item textValue={'email'} key="profile">
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        {user.email}
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item
                    key="settings"
                    css={{ height: '$12' }}
                    withDivider
                    textValue={'Settings'}
                >
                    Préférences
                </Dropdown.Item>
                <Dropdown.Item
                    textValue={'Help & Feedback'}
                    css={{ height: '$12' }}
                    key="help_and_feedback"
                >
                    Aide
                </Dropdown.Item>
                <Dropdown.Section title="Danger zone 🔥">
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
