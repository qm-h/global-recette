import {
    Button,
    Card,
    Grid,
    Text,
    Textarea,
    Tooltip,
    User,
    useTheme,
} from '@nextui-org/react'
import {
    SuccessAuthUser,
    User as UserType,
} from '../../../server/src/shared/types'
import { getUserByID, updateAvatar } from '../router/userRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../utils/theme/toaster'
import { useEffect, useState } from 'react'

import AvatarModal from './components/profile/AvatarModal'
import { TiImage } from 'react-icons/ti'
import { avatar } from '../utils/randomAvatar'
import { useAppContext } from '../utils/context/AppContext'

const UserProfilePage = () => {
    const [addBio, setAddBio] = useState(false)
    const [userProfile, setUserProfile] = useState<SuccessAuthUser>()
    const [changeAvatar, setChangeAvatar] = useState(false)
    const { user, setAvatarIsChanged, avatarIsChanged } = useAppContext()
    const { isDark } = useTheme()

    const handleAddBiography = () => {
        console.log('add biography')
        setAddBio(!addBio)
    }

    const handleChangeAvatar = async (avatar: string) => {
        await updateAvatar(userProfile.id, avatar)
            .then((res) => {
                setChangeAvatar(!changeAvatar)
                setAvatarIsChanged(!avatarIsChanged)
                toasterSuccessCommon(isDark, 'Avatar modifié')
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
        Promise.all([getUserByID(user.id)]).then(([user]) => {
            setUserProfile(user[0])
        })
    }, [user.id, changeAvatar])

    return (
        <Card
            css={{
                height: '86%',
                marginTop: '7rem',
            }}
        >
            <AvatarModal
                user={userProfile}
                isOpen={changeAvatar}
                onClose={onClose}
                avatar={avatar}
                handleChangeAvatar={handleChangeAvatar}
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
            <Grid.Container gap={4}>
                <Grid md={12}>
                    <Tooltip
                        hideArrow
                        content="Modifier l'avatar"
                        placement="right"
                    >
                        <User
                            zoomed
                            bordered
                            onClick={() => setChangeAvatar(!changeAvatar)}
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
                <Grid md={2} justify="flex-end">
                    <Text>
                        <b>{userProfile?.followers}</b> Folowers
                    </Text>
                </Grid>
                <Grid md={2} justify="flex-start">
                    <Text>
                        <b>{userProfile?.following}</b> Following
                    </Text>
                </Grid>
                {addBio ? (
                    <>
                        <Grid md={12} justify="center">
                            <Textarea
                                placeholder="Ajouter une biographie"
                                rows={4}
                                cols={50}
                                color="primary"
                                bordered
                            />
                        </Grid>
                        <Grid md={12} justify="center">
                            <Button
                                css={{
                                    marginRight: '1rem',
                                }}
                                onClick={handleAddBiography}
                                color="error"
                                size="sm"
                            >
                                Annuler
                            </Button>
                            <Button
                                css={{
                                    marginLeft: '1rem',
                                }}
                                color="primary"
                                onClick={handleAddBiography}
                                size="sm"
                            >
                                Ajouter
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <Grid md={12} justify="center">
                        {userProfile?.biography === null ? (
                            <Button
                                onPress={handleAddBiography}
                                auto
                                color="primary"
                                size="sm"
                                rounded
                            >
                                Ajouter une Biographie
                            </Button>
                        ) : (
                            <Text>{userProfile?.biography}</Text>
                        )}
                    </Grid>
                )}
            </Grid.Container>
        </Card>
    )
}

export default UserProfilePage
