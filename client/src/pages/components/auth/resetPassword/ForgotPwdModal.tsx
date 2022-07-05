import { Button, Grid, Input, Loading, Modal, Text } from '@nextui-org/react'

import { HiOutlineMail } from 'react-icons/hi'
import { useState } from 'react'

interface Props {
    setOpenForgotModal: (val: boolean) => void
    visible: boolean
    handleForgotPassword: (email: string) => void
    isLoading: boolean
}

const ForgotPwdModal = ({
    setOpenForgotModal,
    visible,
    handleForgotPassword,
    isLoading,
}: Props) => {
    const [email, setEmail] = useState<string>('')
    const closeHandler = () => {
        setOpenForgotModal(false)
    }

    return (
        <Modal
            aria-labelledby="modal-title"
            open={visible}
            blur
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Mot de passe oublié
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container gap={2}>
                    <Grid md={12} justify="center">
                        <Text small>
                            Entrez votre adresse email pour recevoir un lien de
                            réinitialisation de mot de passe.
                        </Text>
                    </Grid>
                    <Grid md={12} justify="center">
                        <Input
                            clearable
                            bordered
                            fullWidth
                            color="primary"
                            size="lg"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            contentLeft={<HiOutlineMail />}
                        />
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
                <Grid.Container gap={1}>
                    <Grid md={6} justify="center">
                        <Button
                            color="error"
                            flat
                            auto
                            onPress={() => setOpenForgotModal(false)}
                        >
                            Annuler
                        </Button>
                    </Grid>
                    <Grid md={6} justify="center">
                        {isLoading ? (
                            <Button color="primary" auto disabled>
                                <Loading color="currentColor" size="sm" />
                            </Button>
                        ) : (
                            <Button
                                auto
                                flat
                                color="success"
                                onPress={() => handleForgotPassword(email)}
                            >
                                Envoyer
                            </Button>
                        )}
                    </Grid>
                </Grid.Container>
            </Modal.Footer>
        </Modal>
    )
}

export default ForgotPwdModal
