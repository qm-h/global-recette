import {
    Button,
    Card,
    Grid,
    Loading,
    Modal,
    Text,
    Tooltip,
    User,
    useTheme,
} from '@nextui-org/react'
import { Recipe, SuccessAuthUser } from '../../../server/src/shared/types'
import {
    getRecipeByUserID,
    getUserByID,
    saveUserCoverImageUUID,
    updateAvatar,
    updateUserCoverImage,
    uploadUserCoverImage,
} from '../router/userRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../utils/theme/toaster'
import { useEffect, useState } from 'react'

import AvatarModal from './components/profile/AvatarModal'
import UserRecipesList from './components/profile/UserRecipesList'
import { avatar } from '../utils/randomAvatar'
import { isMobile } from 'react-device-detect'
import { useAppContext } from '../utils/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { BsFillCameraFill } from 'react-icons/bs'
import { getSupabaseUserUrlCoverImage } from '../utils/images/supabaseImage'
import { v4 as uuidv4 } from 'uuid'

const UserProfilePage = () => {
    const [userProfile, setUserProfile] = useState<SuccessAuthUser>()
    const [changeAvatar, setChangeAvatar] = useState(false)
    const [coverImageHasBeenChanged, setCoverImageHasBeenChanged] =
        useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingUser, setIsLoadingUser] = useState(true)
    const [isLoadingCoverImage, setIsLoadingCoverImage] = useState(true)
    const [recipesData, setRecipesData] = useState([] as Recipe[])
    const [coverImage, setCoverImage] = useState<File>()
    const [urlCoverImage, setUrlCoverImage] = useState('')
    const [openCoverImage, setOpenCoverImage] = useState(false)
    const [isSaveLoadingCoverImage, setIsSaveLoadingCoverImage] =
        useState(false)
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

    const handleSaveCoverImage = async () => {
        setIsSaveLoadingCoverImage(true)
        if (coverImage) {
            const cover_image_uuid = uuidv4()
            const blob = coverImage.slice(0, coverImage.size, coverImage.type)
            const newCoverImage = new File(
                [blob],
                `${cover_image_uuid}-${Date.now()}`,
                {
                    type: coverImage.type,
                }
            )
            const formData = new FormData()
            formData.append('coverImage', newCoverImage)
            await saveUserCoverImageUUID(
                userProfile.id,
                newCoverImage.name,
                `${coverImage.name}-${Date.now()}`
            )
            await uploadUserCoverImage(formData).then((res) => {
                if (res.status === 200) {
                    setIsSaveLoadingCoverImage(false)
                    setCoverImage(undefined)
                    setOpenCoverImage(false)
                    toasterSuccessCommon(isDark, 'Image de couverture modifiée')
                } else {
                    setIsSaveLoadingCoverImage(false)
                    toasterErrorCommon(isDark, 'Une erreur est survenue')
                }
            })
        }
    }

    const handleUpdateCoverImage = async () => {
        setIsSaveLoadingCoverImage(true)
        console.log(coverImage)
        if (coverImage) {
            const cover_image_uuid = uuidv4()
            const blob = coverImage.slice(0, coverImage.size, coverImage.type)
            const newCoverImage = new File(
                [blob],
                `${cover_image_uuid}-${Date.now()}`,
                {
                    type: coverImage.type,
                }
            )
            const formData = new FormData()
            formData.append('coverImage', newCoverImage)
            await updateUserCoverImage(
                userProfile.id,
                newCoverImage.name,
                `${coverImage.name}-${Date.now()}`
            )
                .then(async (res) => {
                    if (res.status === 200) {
                        await uploadUserCoverImage(formData).then((res) => {
                            if (res.status === 200) {
                                setIsSaveLoadingCoverImage(false)
                                setCoverImage(undefined)
                                setOpenCoverImage(false)
                                setCoverImageHasBeenChanged(true)
                                toasterSuccessCommon(
                                    isDark,
                                    'Image de couverture modifiée'
                                )
                            } else {
                                setIsSaveLoadingCoverImage(false)
                                toasterErrorCommon(
                                    isDark,
                                    'Une erreur est survenue'
                                )
                            }
                        })
                    } else {
                        setIsSaveLoadingCoverImage(false)
                        toasterErrorCommon(isDark, 'Une erreur est survenue')
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
    }, [user.id, userUUID, avatarIsChanged, coverImageHasBeenChanged])

    useEffect(() => {
        console.log(userProfile)
        console.log(userProfile?.cover_image_path)
        if (userProfile !== undefined) {
            Promise.all([getSupabaseUserUrlCoverImage(userProfile.id)])
                .then(([image]) => {
                    setUrlCoverImage(image)
                    setIsLoadingCoverImage(false)
                    setCoverImageHasBeenChanged(false)
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
    }, [userProfile, coverImageHasBeenChanged])
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
            {isLoadingUser || isLoadingCoverImage ? (
                <Grid.Container
                    css={{
                        height: '10%',
                    }}
                    justify="center"
                    alignItems="center"
                >
                    <Loading size={'md'} />
                </Grid.Container>
            ) : urlCoverImage ? (
                <div
                    className="CoverImage"
                    style={{
                        backgroundImage: urlCoverImage
                            ? `url(${urlCoverImage})`
                            : '',
                    }}
                >
                    <Button
                        auto
                        css={{
                            m: '$2',
                            bgBlur: isDark ? '#0f111466' : '#ffffff66',
                            color: isDark ? '#ffffff' : '#000000',
                        }}
                        size="xs"
                        onPress={() => setOpenCoverImage(!openCoverImage)}
                    >
                        <BsFillCameraFill />
                    </Button>
                </div>
            ) : (
                <div
                    className="CoverImage"
                    style={{
                        backgroundColor: `#14a452`,
                    }}
                >
                    <Button
                        auto
                        css={{
                            m: '$2',
                            bgColor: '#fff',
                            color: '#14a452',
                        }}
                        size="xs"
                        onPress={() => setOpenCoverImage(!openCoverImage)}
                    >
                        <BsFillCameraFill />
                    </Button>
                </div>
            )}

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
                        <Grid xs={12} md={12} lg={12} justify="center">
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
            <Modal
                open={openCoverImage}
                closeButton
                preventClose
                width={isMobile ? '80%' : '40%'}
            >
                <Modal.Body>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        hidden
                        aria-label="file"
                        className="inputfile"
                        onChange={(e) => setCoverImage(e.target.files[0])}
                    />
                    <Button
                        auto
                        color="success"
                        flat={coverImage ? true : false}
                    >
                        <label className="labelInput" htmlFor="file">
                            {coverImage && coverImage.name
                                ? `${coverImage.name}`
                                : 'Choisir une photo'}
                        </label>
                    </Button>
                </Modal.Body>
                <Modal.Footer justify={'center'}>
                    {userProfile?.cover_image_path ? (
                        <Button
                            auto
                            color="success"
                            onClick={() => handleUpdateCoverImage()}
                            disabled={!coverImage || isSaveLoadingCoverImage}
                        >
                            {isSaveLoadingCoverImage ? (
                                <Loading color="currentColor" />
                            ) : (
                                'Mettre a jour'
                            )}
                        </Button>
                    ) : (
                        <Button
                            auto
                            color="success"
                            onClick={() => handleSaveCoverImage()}
                            disabled={!coverImage || isSaveLoadingCoverImage}
                        >
                            {isSaveLoadingCoverImage ? (
                                <Loading color="currentColor" />
                            ) : (
                                'Sauvegarder'
                            )}
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </Card>
    )
}

export default UserProfilePage
