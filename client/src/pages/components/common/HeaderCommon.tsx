import { Avatar, Grid, Link, Tooltip, useTheme } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import MenuList from './commonComponents/MenuList'
import { SuccessAuthUser as UserType } from '../../../../../server/src/shared/types'
import { getUserByID } from '../../../router/userRouter'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import HeaderLogo from './commonComponents/HeaderLogo'
import MenuComponent from './commonComponents/MenuComponent'
import MobileMenuComponent from './commonComponents/MobileMenuComponent'
import { FaDoorOpen } from 'react-icons/fa'

interface Props {
    isAuthenticated: boolean
    setIsAuthenticated: (val: boolean) => void
    user: UserType
    setUser: (user: UserType) => void
    setUserUUID: (uuid: string) => void
    avatarIsChanged: boolean
}

const HeaderCommon = ({
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    setUserUUID,
    avatarIsChanged,
}: Props) => {
    const { isDark } = useTheme()
    const navigate = useNavigate()
    const [userProfile, setUserProfile] = useState<UserType>()

    useEffect(() => {
        if (user) {
            Promise.all([getUserByID(user.id)])
                .then(([user]) => {
                    setUserProfile(user[0])
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [user, avatarIsChanged])

    return (
        <div
            className={`header_common ${
                !isMobile && isDark ? 'dark_header' : 'light_header'
            }  ${isMobile && isDark && 'blur_dark_header'} ${
                isMobile && !isDark && 'blur_light_header'
            }`}
        >
            <Grid.Container>
                {isMobile ? (
                    <>
                        <Grid xs={9} justify="flex-start" alignItems="center">
                            <HeaderLogo
                                isMobile={isMobile}
                                navigate={navigate}
                            />
                        </Grid>
                        <Grid xs={3} justify="flex-end" alignItems="center">
                            {isAuthenticated ? (
                                <MobileMenuComponent
                                    navigate={navigate}
                                    isAuthenticated={isAuthenticated}
                                    isDark={isDark}
                                    setIsAuthenticated={setIsAuthenticated}
                                    setUser={setUser}
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
                                                <FaDoorOpen
                                                    color="#FFF"
                                                    size="1em"
                                                />
                                            }
                                        />
                                    </Tooltip>
                                </Link>
                            )}
                        </Grid>
                    </>
                ) : (
                    <>
                        <Grid
                            xs={12}
                            md={3}
                            sm={12}
                            lg={3}
                            justify="flex-start"
                            alignItems="center"
                        >
                            <HeaderLogo
                                isMobile={isMobile}
                                navigate={navigate}
                            />
                        </Grid>
                        <Grid xs={12} sm={12} md={7} alignItems="center">
                            <MenuList
                                isAuthenticated={isAuthenticated}
                                user={user}
                            />
                        </Grid>
                        <Grid
                            xs={12}
                            sm={12}
                            md={2}
                            justify="flex-end"
                            alignItems="center"
                        >
                            <MenuComponent
                                isAuthenticated={isAuthenticated}
                                setUser={setUser}
                                setUserUUID={setUserUUID}
                                avatarIsChanged={avatarIsChanged}
                                userProfile={userProfile}
                                setIsAuthenticated={setIsAuthenticated}
                                navigate={navigate}
                                isDark={isDark}
                            />
                        </Grid>
                    </>
                )}
            </Grid.Container>
        </div>
    )
}

export default HeaderCommon
