import { Avatar, Button, Grid, Loading, Modal, Text } from '@nextui-org/react'

import { useState } from 'react'

interface AvatarModalProps {
    isOpen: boolean
    onClose: () => void
    avatar: string[]
    handleChangeAvatar: (avatar: string) => void
    isLoading: boolean
    isMobile: boolean
}

const AvatarModal = ({
    isOpen,
    onClose,
    avatar,
    handleChangeAvatar,
    isLoading,
    isMobile,
}: AvatarModalProps) => {
    const [selectedAvatar, setSelectedAvatar] = useState(avatar[0])

    return (
        <Modal
            open={isOpen}
            blur={isMobile}
            width={isMobile ? '95%' : '50%'}
            onClose={onClose}
            preventClose
        >
            <Modal.Header>
                <Text h3={!isMobile} h4={isMobile}>
                    Modifier l'avatar
                </Text>
            </Modal.Header>
            <Modal.Body
                css={{
                    overflow: 'auto',
                    h: isMobile ? '30vh' : 'auto',
                    pr: '$0',
                }}
            >
                <Grid.Container gap={1} wrap="wrap">
                    {avatar.map((avatar, index) => (
                        <Grid key={index} justify="center" alignItems="center">
                            <Avatar
                                key={index}
                                src={avatar}
                                size={isMobile ? 'lg' : 'xl'}
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
                <Button
                    size={isMobile ? 'sm' : 'md'}
                    color="error"
                    flat
                    auto
                    onClick={onClose}
                >
                    Annuler
                </Button>
                <Button
                    auto
                    size={isMobile ? 'sm' : 'md'}
                    color="success"
                    flat={!isMobile}
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
