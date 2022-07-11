import { Avatar, Button, Grid, Loading, Modal, Text } from '@nextui-org/react'

import { SuccessAuthUser } from '../../../../../server/src/shared/types'
import { useState } from 'react'

interface AvatarModalProps {
    isOpen: boolean
    onClose: () => void
    avatar: string[]
    handleChangeAvatar: (avatar: string) => void
    user: SuccessAuthUser
}

const AvatarModal = ({
    isOpen,
    onClose,
    avatar,
    handleChangeAvatar,
    user,
}: AvatarModalProps) => {
    const [selectedAvatar, setSelectedAvatar] = useState(avatar[0])

    return (
        <Modal open={isOpen} width="50%" onClose={onClose}>
            <Modal.Header>
                <Text h3>Modifier l'avatar</Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container gap={1} wrap="wrap">
                    {user && user.avatar ? (
                        avatar.map((avatar, index) => (
                            <Grid
                                key={index}
                                justify="center"
                                alignItems="center"
                            >
                                <Avatar
                                    key={index}
                                    src={avatar}
                                    size="xl"
                                    bordered
                                    squared
                                    color={
                                        selectedAvatar === avatar
                                            ? 'primary'
                                            : 'default'
                                    }
                                    rounded
                                    pointer
                                    onClick={() => setSelectedAvatar(avatar)}
                                />
                            </Grid>
                        ))
                    ) : (
                        <Loading type="points" size="md" />
                    )}
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
                <Button color="error" flat auto onClick={onClose}>
                    Annuler
                </Button>
                <Button
                    auto
                    color="success"
                    flat
                    onClick={() => handleChangeAvatar(selectedAvatar)}
                >
                    Valider
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AvatarModal
