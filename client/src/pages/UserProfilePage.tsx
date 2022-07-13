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
    getUserByID,
    updateAvatar,
    getRecipeByUserID,
} from '../router/userRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../utils/theme/toaster'
import { useEffect, useState } from 'react'

import AvatarModal from './components/profile/AvatarModal'
import { TiImage } from 'react-icons/ti'
import { avatar } from '../utils/randomAvatar'
import { useAppContext } from '../utils/context/AppContext'
import UserRecipesList from './components/profile/UserRecipesList'

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState<SuccessAuthUser>()
    const [changeAvatar, setChangeAvatar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [recipesData, setRecipesData] = useState([] as Recipe[])
    const { user, setAvatarIsChanged, avatarIsChanged, userUUID } =
        useAppContext()
    const { isDark } = useTheme()

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
            css={{
                height: '86%',
                marginTop: '7rem',
            }}
        >
            <AvatarModal
                isOpen={changeAvatar}
                onClose={onClose}
                avatar={avatar}
                handleChangeAvatar={handleChangeAvatar}
                isLoading={isLoading}
            />
            <div
                className="CoverImage"
                style={{
                    backgroundColor: `#14a452`,
                }}
            >
                <Tooltip content="Modifier la photo de couverture">
                    <TiImage color="#fff" size="2em" />
                </Tooltip>
            </div>
            <Grid.Container
                gap={4}
                css={{
                    h: isLoadingUser && '100%',
                }}
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                {isLoadingUser ? (
                    <Loading size="xl" type="points-opacity" color="primary" />
                ) : (
                    <>
                        <Grid md={12}>
                            <Tooltip
                                hideArrow
                                content="Modifier l'avatar"
                                placement="right"
                            >
                                <User
                                    zoomed
                                    bordered
                                    onClick={() =>
                                        setChangeAvatar(!changeAvatar)
                                    }
                                    color="primary"
                                    size="xl"
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
                        <Grid md={6} justify="flex-end">
                            <Text>
                                <Text color="success" b>
                                    {userProfile?.followers}
                                </Text>{' '}
                                Abonnés
                            </Text>
                        </Grid>
                        <Grid md={6} justify="flex-start">
                            <Text>
                                <Text color="success" b>
                                    {userProfile?.following}
                                </Text>{' '}
                                Abonnements
                            </Text>
                        </Grid>
                        <Grid md={12} justify="center">
                            {recipesData && recipesData.length ? (
                                <UserRecipesList recipes={recipesData} />
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
