import { Button, Card, Grid, Input, Modal, Row, Text } from '@nextui-org/react'

import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useState } from 'react'

interface UpdateEmailProps {
    isDark: boolean
    isMobile: boolean
}

const UpdateEmail = ({ isDark, isMobile }: UpdateEmailProps) => {
    const [wantToChangeEmail, setWantToChangeEmail] = useState(false)

    const closeHandler = () => {
        setWantToChangeEmail(false)
    }
    return (
        <Card
            css={{
                width: isMobile ? '70%' : '100%',
                height: '100%',
                padding: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            variant={isMobile ? 'flat' : 'shadow'}
        >
            <Grid
                sm={12}
                md={12}
                lg={12}
                justify="center"
                alignContent="center"
                alignItems="center"
                css={{
                    padding: isMobile ? '$10' : '$18',
                }}
            >
                <Button
                    color="success"
                    auto
                    flat={isDark && !isMobile}
                    onPress={() => setWantToChangeEmail(!wantToChangeEmail)}
                    icon={<HiOutlineMail size="1rem" />}
                >
                    Modifier mon email
                </Button>
            </Grid>
            <Modal
                closeButton
                preventClose
                blur
                width={isMobile ? '90%' : '30%'}
                aria-labelledby="change-email-modal"
                open={wantToChangeEmail}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="change-email-modal-title" size={18}>
                        Entrez votre mot de passe afin de modifier votre email
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Input.Password
                            aria-label="Password"
                            placeholder="Mot de passe"
                            bordered
                            color="primary"
                            contentLeft={<RiLockPasswordLine size="1.5rem" />}
                            width="100%"
                        />
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button light color="success" auto onClick={closeHandler}>
                        Confirmer
                    </Button>
                </Modal.Footer>
            </Modal>
        </Card>
    )
}

export default UpdateEmail
