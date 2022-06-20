import { Grid, theme, useTheme } from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { User } from '../../../../../../server/src/shared/types'

interface Props {
    user: User
}

const MenuList = ({ user }: Props) => {
    const { isDark } = useTheme()
    const [active, setActive] = useState<string>('home')
    const url = useLocation().pathname

    useEffect(() => {
        switch (url) {
            case '/':
                setActive('home')
                break
            case '/mesrecettes':
                setActive('recettes')
                break
            case '/mesfavoris':
                setActive('favoris')
                break
            default:
                setActive('home')
                break
        }
    }, [url])

    return (
        <Grid.Container gap={0} justify={user ? 'space-between' : 'center'}>
            <Grid xs={4}>
                <NavLink
                    className={`link ${isDark ? 'dark_link' : 'light_link'} ${
                        isDark && active === 'home' && 'active_dark'
                    }
                        ${!isDark && active === 'home' && 'active_light'}`}
                    to="/"
                >
                    Recettes du moment
                </NavLink>
            </Grid>
            {user ? (
                <>
                    <Grid xs={4}>
                        <NavLink
                            to="/mesrecettes"
                            className={`link ${
                                isDark ? 'dark_link' : 'light_link'
                            } ${
                                isDark && active === 'recettes' && 'active_dark'
                            }
                                ${
                                    !isDark &&
                                    active === 'recettes' &&
                                    'active_light'
                                }`}
                        >
                            Mes Recettes
                        </NavLink>
                    </Grid>
                    <Grid xs={4}>
                        <NavLink
                            className={`link ${
                                isDark ? 'dark_link' : 'light_link'
                            } ${isDark && active === 'favoris' && 'active_dark'}
                                ${
                                    !isDark &&
                                    active === 'favoris' &&
                                    'active_light'
                                }`}
                            to="/mesfavoris"
                        >
                            Mes Favoris
                        </NavLink>
                    </Grid>
                </>
            ) : null}
        </Grid.Container>
    )
}

export default MenuList
