import { Grid, useTheme } from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { SuccessAuthUser } from '../../../../../../server/src/shared/types'
import { Justify } from '@nextui-org/react/types/utils/prop-types'

interface Props {
    user: SuccessAuthUser
    isAuthenticated: boolean
}

const MenuList = ({ user, isAuthenticated }: Props) => {
    const { isDark } = useTheme()
    const [active, setActive] = useState<string>('')
    const url = useLocation().pathname
    const [containerJustify, setContainerJustify] = useState<Justify>('center')

    useEffect(() => {
        switch (url) {
            case '/':
                setActive('home')
                break
            case '/mes-recettes':
                setActive('recettes')
                break
            case '/mes-favoris':
                setActive('favoris')
                break
            default:
                setActive('')
                break
        }
    }, [url])

    useEffect(() => {
        if (user || isAuthenticated) {
            setContainerJustify('space-between')
        } else {
            setContainerJustify('center')
        }
    }, [isAuthenticated])

    return (
        <Grid.Container gap={4} justify={containerJustify}>
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
            {isAuthenticated && user ? (
                <>
                    <Grid xs={4}>
                        <NavLink
                            to="/mes-recettes"
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
                            to="/mes-favoris"
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
