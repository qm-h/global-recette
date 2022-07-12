import { Avatar, Button, Grid, Loading, Modal, Text } from '@nextui-org/react'

import { useState } from 'react'

interface AvatarModalProps {
    isOpen: boolean
    onClose: () => void
    avatar: string[]
    handleChangeAvatar: (avatar: string) => void
    isLoading: boolean
}

const AvatarModal = ({
    isOpen,
    onClose,
    avatar,
    handleChangeAvatar,
    isLoading,
}: AvatarModalProps) => {
    const [selectedAvatar, setSelectedAvatar] = useState(avatar[0])

    return (
        <Modal open={isOpen} width="50%" onClose={onClose}>
            <Modal.Header>
                <Text h3>Modifier l'avatar</Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container gap={1} wrap="wrap">
                    {avatar.map((avatar, index) => (
                        <Grid key={index} justify="center" alignItems="center">
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
                    ))}
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
                    disabled={isLoading}
                    onClick={() => handleChangeAvatar(selectedAvatar)}
                >
                    {isLoading ? (
                        <Loading size="sm" color="currentColor" />
                    ) : (
                        'Valider'
                    )}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default AvatarModal
