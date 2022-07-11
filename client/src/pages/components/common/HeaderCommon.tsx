import {
    Avatar,
    Grid,
    Link,
    Switch,
    Text,
    Tooltip,
    useTheme,
} from '@nextui-org/react'

import { FaDoorOpen } from 'react-icons/fa'
import MenuList from './commonComponents/MenuList'
import UserMenu from './commonComponents/UserMenu'
import { SuccessAuthUser as UserType } from '../../../../../server/src/shared/types'
import { useNavigate } from 'react-router-dom'

interface Props {
    isAuthenticated: boolean
    setIsAuthenticated: (val: boolean) => void
    user: UserType
    setUser: (user: UserType) => void
    setUserUUID: (uuid: string) => void
}

const HeaderCommon = ({
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    setUserUUID,
}: Props) => {
    const { isDark } = useTheme()
    const navigate = useNavigate()
    return (
        <div
            className={`header_common ${
                isDark ? 'dark_header' : 'light_header'
            }`}
        >
            <Grid.Container>
                <Grid xs={3} justify="flex-start" alignItems="center">
                    <Text
                        onClick={() => navigate('/')}
                        h2
                        b
                        css={{ cursor: 'pointer' }}
                    >
                        Global Recette 🍔
                    </Text>
                </Grid>
                <Grid xs={7} alignItems="center">
                    <MenuList isAuthenticated={isAuthenticated} user={user} />
                </Grid>
                <Grid xs={2} justify="flex-end" alignItems="center">
                    {isAuthenticated ? (
                        <UserMenu
                            setUser={setUser}
                            setIsAuthenticated={setIsAuthenticated}
                            setUserUUID={setUserUUID}
                            user={user}
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
                                    icon={
                                        <FaDoorOpen color="#FFF" size="1em" />
                                    }
                                />
                            </Tooltip>
                        </Link>
                    )}
                </Grid>
            </Grid.Container>
        </div>
    )
}

export default HeaderCommon
