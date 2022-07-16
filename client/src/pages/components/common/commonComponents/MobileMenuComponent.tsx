import { Button, Dropdown, Link, Text } from '@nextui-org/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Key, useEffect, useState } from 'react'
import { NavigateFunction, NavLink, useLocation } from 'react-router-dom'
import { SuccessAuthUser as UserType } from '../../../../../../server/src/shared/types'
import handleMenu from '../../../../utils/navigation'

interface Props {
    isAuthenticated: boolean
    navigate: NavigateFunction
    setIsAuthenticated: (val: boolean) => void
    user: UserType
    setUser: (user: UserType) => void
    setUserUUID: (uuid: string) => void
    isDark: boolean
}

const MobileMenuComponent = ({
    isAuthenticated,
    navigate,
    user,
    setUser,
    setIsAuthenticated,
    setUserUUID,
    isDark,
}: Props) => {
    const [active, setActive] = useState<string>('')
    const url = useLocation().pathname

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
            case '/login':
                setActive('login')
                break
            default:
                setActive('')
                break
        }
    }, [url])

    return (
        <Dropdown placement="bottom-left">
            <Dropdown.Trigger>
                <Button size={'sm'} color={'success'} auto>
                    <GiHamburgerMenu />
                </Button>
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
                <Dropdown.Section title="Navigation">
                    <Dropdown.Item key="home" css={{ height: '$12' }}>
                        <NavLink
                            className={`link ${
                                isDark
                                    ? 'mobile_dark_link'
                                    : 'mobile_light_link'
                            } ${
                                isDark &&
                                active === 'home' &&
                                'mobile_active_dark'
                            }
                        ${
                            !isDark &&
                            active === 'home' &&
                            'mobile_active_light'
                        }`}
                            to="/"
                        >
                            Recettes du moment
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item key="recipe" css={{ height: '$12' }}>
                        <NavLink
                            to="/mes-recettes"
                            className={`link ${
                                isDark
                                    ? 'mobile_dark_link'
                                    : 'mobile_light_link'
                            } ${
                                isDark &&
                                active === 'recettes' &&
                                'mobile_active_dark'
                            }
                        ${
                            !isDark &&
                            active === 'recettes' &&
                            'mobile_active_light'
                        }`}
                        >
                            Mes Recettes
                        </NavLink>
                    </Dropdown.Item>
                    <Dropdown.Item key="favorite" css={{ height: '$12' }}>
                        <NavLink
                            className={`link ${
                                isDark
                                    ? 'mobile_dark_link'
                                    : 'mobile_light_link'
                            } ${
                                isDark &&
                                active === 'favoris' &&
                                'mobile_active_dark'
                            }
                        ${
                            !isDark &&
                            active === 'favoris' &&
                            'mobile_active_light'
                        }`}
                            to="/mes-favoris"
                        >
                            Mes Favoris
                        </NavLink>
                    </Dropdown.Item>
                </Dropdown.Section>
                <Dropdown.Item withDivider textValue={'profile'} key="profile">
                    <Text color="inherit" css={{ d: 'flex' }}>
                        Profile
                    </Text>
                </Dropdown.Item>
                <Dropdown.Item
                    key="settings"
                    css={{ height: '$12' }}
                    textValue={'Settings'}
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

export default MobileMenuComponent
