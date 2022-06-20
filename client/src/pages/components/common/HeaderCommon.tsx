import { Avatar, Grid, Link, Switch, Text, useTheme } from '@nextui-org/react'

import MenuList from './commonComponents/MenuList'
import MoonIcon from '../../../lib/theme/MoonIcon'
import SunIcon from '../../../lib/theme/SunIcon'
import { User } from '../../../../../server/src/shared/types'
import UserMenu from './commonComponents/UserMenu'
import { useTheme as useNextTheme } from 'next-themes'

interface Props {
    isAuthenticated: boolean
    userHasAuthenticated: (val: boolean) => void
    user: User
}

const HeaderCommon = ({
    isAuthenticated,
    userHasAuthenticated,
    user,
}: Props) => {
    const { setTheme } = useNextTheme()
    const { isDark } = useTheme()

    return (
        <div
            className={`header_common ${
                isDark ? 'dark_header' : 'light_header'
            }`}
        >
            <Grid.Container justify="space-between">
                <Grid xs={3} alignItems="center">
                    <Text h1 weight="bold">
                        Global Recette 🍔
                    </Text>
                </Grid>
                <Grid xs={5} alignItems="center">
                    <MenuList user={user} />
                </Grid>
                <Grid xs={1} alignItems="center">
                    <Switch
                        checked={isDark}
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
                        <UserMenu user={user} />
                    ) : (
                        <Link block href="/login" color="warning">
                            Login
                        </Link>
                    )}
                </Grid>
            </Grid.Container>
        </div>
    )
}

export default HeaderCommon
