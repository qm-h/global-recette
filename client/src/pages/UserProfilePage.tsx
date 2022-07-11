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

import { TiImage } from 'react-icons/ti'
import { User as UserType } from '../../../server/src/shared/types'
import { useAppContext } from '../utils/context/AppContext'
import { useState } from 'react'

const UserProfilePage = () => {
    const [addBio, setAddBio] = useState(false)
    const { user } = useAppContext()
    const { isDark } = useTheme()
    const profileUser: UserType = user

    const handleAddBiography = () => {
        console.log('add biography')
        setAddBio(!addBio)
    }

    return (
        <Card
            css={{
                height: '86%',
                marginTop: '7rem',
            }}
        >
            <div
                className="CoverImage"
                style={{
                    backgroundColor: `#4A15B6`,
                }}
            >
                <Tooltip content="Modifier la photo de couverture">
                    <TiImage color="#fff" size="2em" />
                </Tooltip>
            </div>
            <Grid.Container gap={4}>
                <Grid md={12}>
                    <User
                        size="xl"
                        name={profileUser.username}
                        src={profileUser.generated_avatar}
                    />
                </Grid>
                <Grid md={2} justify="flex-end">
                    <Text>
                        <b>{profileUser.followers}</b> Folowers
                    </Text>
                </Grid>
                <Grid md={2} justify="flex-start">
                    <Text>
                        <b>{profileUser.following}</b> Following
                    </Text>
                </Grid>
                {addBio ? (
                    <Grid md={12} justify="center">
                        <Textarea
                            placeholder="Ajouter une biographie"
                            rows={4}
                            cols={50}
                            color="default"
                            css={{
                                borderColor: isDark ? '#787F85' : '#4A15B6',
                                transition: 'border-color 0.3s ease-in-out',
                                '&:hover': {
                                    borderColor: isDark ? '#4A15B6' : '#4A15B6',
                                },
                                '&:focus': {
                                    borderColor: isDark ? '#4A15B6' : '#4A15B6',
                                },
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                borderRadius: '$lg',
                                padding: '$sm',
                                marginTop: '$sm',
                                marginBottom: '$sm',
                            }}
                        />
                    </Grid>
                ) : (
                    <Grid md={12} justify="center">
                        {profileUser && profileUser.biography === null ? (
                            <Button
                                onPress={handleAddBiography}
                                auto
                                css={{ bg: '#4A15B6' }}
                                size="xs"
                            >
                                Ajouter une Biographie
                            </Button>
                        ) : (
                            <Text>{profileUser.biography}</Text>
                        )}
                    </Grid>
                )}
            </Grid.Container>
        </Card>
    )
}

export default UserProfilePage
