import {
    Avatar,
    Grid,
    Link,
    Switch,
    Text,
    Tooltip,
    useTheme,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { FaDoorOpen } from 'react-icons/fa'
import MenuList from './commonComponents/MenuList'
import UserMenu from './commonComponents/UserMenu'
import { SuccessAuthUser as UserType } from '../../../../../server/src/shared/types'
import { getUserByID } from '../../../router/userRouter'
import { useNavigate } from 'react-router-dom'

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
        Promise.all([getUserByID(user.id)])
            .then(([user]) => {
                setUserProfile(user[0])
            })
            .catch((err) => {
                console.log(err)
            })
    }, [user.id, avatarIsChanged])

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
                            user={userProfile}
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
