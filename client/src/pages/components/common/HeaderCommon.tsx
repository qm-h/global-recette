import {
    Avatar,
    Grid,
    Link,
    Switch,
    Text,
    Tooltip,
    useTheme,
} from '@nextui-org/react'

import { LoginIcon } from '../../../lib/theme/Icons/LoginIcon'
import MenuList from './commonComponents/MenuList'
import MoonIcon from '../../../lib/theme/Icons/MoonIcon'
import SunIcon from '../../../lib/theme/Icons/SunIcon'
import UserMenu from './commonComponents/UserMenu'
import { SuccessAuthUser as UserType } from '../../../../../server/src/shared/types'
import { useNavigate } from 'react-router-dom'
import { useTheme as useNextTheme } from 'next-themes'

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
    const { setTheme } = useNextTheme()
    const { isDark } = useTheme()
    const navigate = useNavigate()
    return (
        <div
            className={`header_common ${
                isDark ? 'dark_header' : 'light_header'
            }`}
        >
            <Grid.Container justify="space-between">
                <Grid xs={3} alignItems="center">
                    <Text
                        onClick={() => navigate('/')}
                        h1
                        b
                        css={{ cursor: 'pointer' }}
                    >
                        Global Recette 🍔
                    </Text>
                </Grid>
                <Grid xs={5} alignItems="center">
                    <MenuList user={user} />
                </Grid>
                <Grid xs={1} alignItems="center">
                    <Switch
                        checked={isDark}
                        color="success"
                        onChange={(e) =>
                            setTheme(e.target.checked ? 'dark' : 'light')
                        }
                        size="xl"
                        iconOff={
                            <SunIcon
                                filled
                                size={undefined}
                                height={undefined}
                                width={undefined}
                                label={undefined}
                            />
                        }
                        iconOn={
                            <MoonIcon
                                filled
                                size={undefined}
                                height={undefined}
                                width={undefined}
                                label={undefined}
                            />
                        }
                    />
                </Grid>
                <Grid xs={1} alignItems="center">
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
                                placement="bottom"
                                shadow
                                rounded
                                color="success"
                            >
                                <Avatar
                                    squared
                                    pointer
                                    color="success"
                                    icon={<LoginIcon />}
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
