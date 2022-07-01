import { Dropdown, Text, User, useTheme } from '@nextui-org/react'

import { Key } from 'react'
import { User as UserType } from '../../../../../../server/src/shared/types'
import { logout } from '../../../../lib/auth/logout'
import { toasterSuccessLogout } from '../../../../lib/theme/toaster'
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
            await userLogout(user.id)
                .then(() => {
                    logout(setUser, setIsAuthenticated, setUserUUID)
                    toasterSuccessLogout(isDark)
                    navigate('/')
                })
                .catch(() => {
                    console.log('')
                })
        }
    }

    return (
        <Dropdown placement="top">
            <Dropdown.Trigger>
                <User
                    bordered
                    as="button"
                    pointer
                    size="lg"
                    color="gradient"
                    name={`${user.firstname} ${user.lastname}`}
                    description={`@${user.username}`}
                    src={user.avatar}
                />
            </Dropdown.Trigger>
            <Dropdown.Menu
                onAction={(key: Key) => handleLogout(key)}
                color="primary"
                aria-label="User Actions"
            >
                <Dropdown.Item
                    textValue={'email'}
                    key="profile"
                    css={{ height: '$12' }}
                >
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
                    My Settings
                </Dropdown.Item>
                <Dropdown.Item
                    textValue={'Help & Feedback'}
                    css={{ height: '$12' }}
                    key="help_and_feedback"
                >
                    Help & Feedback
                </Dropdown.Item>
                <Dropdown.Section title="Danger zone">
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
