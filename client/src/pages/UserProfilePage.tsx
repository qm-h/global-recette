import {
    Card,
    Grid,
    Loading,
    Text,
    Tooltip,
    User,
    useTheme,
} from '@nextui-org/react'
import { Recipe, SuccessAuthUser } from '../../../server/src/shared/types'
import {
    getRecipeByUserID,
    getUserByID,
    updateAvatar,
} from '../router/userRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../utils/theme/toaster'
import { useEffect, useState } from 'react'

import AvatarModal from './components/profile/AvatarModal'
import { TiImage } from 'react-icons/ti'
import UserRecipesList from './components/profile/UserRecipesList'
import { avatar } from '../utils/randomAvatar'
import { isMobile } from 'react-device-detect'
import { useAppContext } from '../utils/context/AppContext'
import { useNavigate } from 'react-router-dom'

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState<SuccessAuthUser>()
    const [changeAvatar, setChangeAvatar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [recipesData, setRecipesData] = useState([] as Recipe[])
    const { user, setAvatarIsChanged, avatarIsChanged, userUUID } =
        useAppContext()
    const { isDark } = useTheme()
    const navigate = useNavigate()

    const handleChangeAvatar = async (avatar: string) => {
        setIsLoading(true)
        await updateAvatar(userProfile.id, avatar)
            .then((res) => {
                if (res.status === 200) {
                    setChangeAvatar(!changeAvatar)
                    setAvatarIsChanged(!avatarIsChanged)
                    setIsLoading(false)
                    toasterSuccessCommon(isDark, 'Avatar modifié')
                } else {
                    setIsLoading(false)
                    toasterSuccessCommon(isDark, 'Une erreur est survenue')
                }
            })
            .catch((err) => {
                console.log(err)
                toasterErrorCommon(
                    isDark,
                    "Erreur lors de la modification de l'avatar"
                )
            })
    }

    const onClose = () => {
        setChangeAvatar(false)
    }

    useEffect(() => {
        Promise.all([
            getUserByID(user.id),
            getRecipeByUserID(user.id, userUUID),
        ]).then(([user, recipe]) => {
            setUserProfile(user[0])
            setRecipesData(recipe.recipes)
            setIsLoadingUser(false)
        })
    }, [user.id, changeAvatar, userUUID])

    return (
        <Card
            variant={isMobile ? 'flat' : 'shadow'}
            css={{
                height: '85%',
                marginTop: isMobile ? '$15' : '$28',
            }}
        >
            <AvatarModal
                isOpen={changeAvatar}
                onClose={onClose}
                avatar={avatar}
                isMobile={isMobile}
                handleChangeAvatar={handleChangeAvatar}
                isLoading={isLoading}
            />
            <div
                className="CoverImage"
                style={{
                    backgroundColor: `#14a452`,
                }}
            >
                <Tooltip
                    css={{ width: 'fit-content' }}
                    placement="left"
                    content="Modifier la photo de couverture"
                >
                    <TiImage color="#fff" size="2em" />
                </Tooltip>
            </div>
            <Grid.Container
                gap={!isMobile && 4}
                css={{
                    h: isLoadingUser && '100%',
                    mt: isMobile ? '1rem' : '',
                }}
                justify={
                    isMobile && !isLoadingUser ? 'space-between' : 'center'
                }
                alignItems="center"
                alignContent="center"
            >
                {isLoadingUser ? (
                    <Loading size="xl" type="points-opacity" color="primary" />
                ) : (
                    <>
                        <Grid xs={3} md={12}>
                            <Tooltip
                                hideArrow
                                content="Modifier l'avatar"
                                placement={isMobile ? 'topStart' : 'right'}
                                css={{
                                    width: 'fit-content',
                                }}
                            >
                                <User
                                    zoomed
                                    bordered
                                    onClick={() =>
                                        setChangeAvatar(!changeAvatar)
                                    }
                                    color="primary"
                                    size={isMobile ? 'lg' : 'xl'}
                                    pointer
                                    name={userProfile?.username}
                                    src={
                                        userProfile?.avatar
                                            ? userProfile?.avatar
                                            : userProfile?.generated_avatar
                                    }
                                />
                            </Tooltip>
                        </Grid>
                        <Grid xs={4} md={6} justify="flex-end">
                            <Text>
                                <Text color="success" b>
                                    {userProfile?.followers}
                                </Text>{' '}
                                Abonnés
                            </Text>
                        </Grid>
                        <Grid xs={4} md={6} justify="flex-start">
                            <Text>
                                <Text color="success" b>
                                    {userProfile?.following}
                                </Text>{' '}
                                Abonnements
                            </Text>
                        </Grid>
                        <Grid xs={12} md={12} justify="center">
                            {recipesData && recipesData.length ? (
                                <UserRecipesList
                                    isMobile={isMobile}
                                    navigate={navigate}
                                    isDark={isDark}
                                    recipes={recipesData}
                                />
                            ) : (
                                'Aucun Recette'
                            )}
                        </Grid>
                    </>
                )}
            </Grid.Container>
        </Card>
    )
}

export default UserProfilePage
