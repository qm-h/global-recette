import { Avatar, Dropdown, Text, User } from '@nextui-org/react'

import { User as UserType } from '../../../../../../server/src/shared/types'

interface Props {
    user: UserType
}

const UserMenu = ({ user }: Props) => {
    return (
        <Dropdown placement="top">
            <Dropdown.Trigger>
                <Avatar
                    text={user.username}
                    color="primary"
                    textColor="white"
                />
            </Dropdown.Trigger>
            <Dropdown.Menu color="primary" aria-label="User Actions">
                <Dropdown.Item key="profile" css={{ height: '$12' }}>
                    <Text b color="inherit" css={{ d: 'flex' }}>
                        {user.email}
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item
                    key="settings"
                    css={{ height: '$12' }}
                    withDivider
                >
                    My Settings
                </Dropdown.Item>
                <Dropdown.Item css={{ height: '$12' }} key="help_and_feedback">
                    Help & Feedback
                </Dropdown.Item>
                <Dropdown.Section title="Danger zone">
                    <Dropdown.Item
                        css={{ height: '$12' }}
                        key="logout"
                        color="error"
                    >
                        Log Out
                    </Dropdown.Item>
                </Dropdown.Section>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default UserMenu
