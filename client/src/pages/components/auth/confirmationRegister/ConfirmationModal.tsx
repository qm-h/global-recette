import { Button, Grid, Loading, Modal, Text } from '@nextui-org/react'

import { FaDoorOpen } from 'react-icons/fa'
import { RiMailSendLine } from 'react-icons/ri'
import { sendConfirmationRegisterEmail } from '../../../../router/authRouter'
import { toasterSuccessCommon } from '../../../../utils/theme/toaster'
import { useState } from 'react'

interface Props {
    openConfirm: boolean
    setOpenConfirm: (val: boolean) => void
    email: string
    isDark: boolean
}

const ConfirmationModal = ({
    openConfirm,
    setOpenConfirm,
    email,
    isDark,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const closeHandler = () => setOpenConfirm(false)
    const handleSendConfirmationEmail = () => {
        setIsLoading(true)
        sendConfirmationRegisterEmail(email)
            .then(() => {
                setIsLoading(false)
                toasterSuccessCommon(
                    isDark,
                    'Un email de confirmation vous a été envoyé'
                )
                closeHandler()
            })
            .catch(() => {
                setIsLoading(false)
                closeHandler()
            })
    }
    return (
        <Modal
            blur
            aria-labelledby="modal-title"
            open={openConfirm}
            onClose={closeHandler}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Confirmation d'email
                </Text>
            </Modal.Header>
            <Modal.Body>
                <Grid.Container gap={1}>
                    <Grid md={12} justify="center">
                        <Text small color="error">
                            Vous n'avez pas encore confirmé votre adresse email.
                        </Text>
                    </Grid>
                    <Grid md={12} justify="center">
                        <Text small color="error">
                            Vous avez normalement reçu un email de confirmation.
                        </Text>
                    </Grid>
                    <Grid md={12} justify="center">
                        <Text small color="error">
                            Veillez a bien vérifier votre boîte de réception et
                            vos spam.
                        </Text>
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
                <Grid.Container gap={1}>
                    <Grid md={12} justify="center">
                        <Text small>
                            Vous pouvez toujours demandez un nouveau lien de
                            confirmation.
                        </Text>
                    </Grid>
                    <Grid md={12} justify="center">
                        {isLoading ? (
                            <Button light auto color="primary" disabled>
                                <Loading color="currentColor" size="sm" />
                            </Button>
                        ) : (
                            <Button
                                onPress={() => handleSendConfirmationEmail()}
                                color="primary"
                                auto
                                iconRight={<RiMailSendLine />}
                            >
                                Nouveau lien de confirmation
                            </Button>
                        )}
                    </Grid>
                    <Grid md={12} justify="center">
                        <Button
                            flat
                            auto
                            color="error"
                            iconRight={<FaDoorOpen />}
                            onClick={closeHandler}
                        >
                            Continuer en tant qu'invité
                        </Button>
                    </Grid>
                </Grid.Container>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmationModal
