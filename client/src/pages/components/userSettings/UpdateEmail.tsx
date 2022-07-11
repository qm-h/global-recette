import { Button, Card, Grid, Input, Modal, Row, Text } from '@nextui-org/react'

import { HiOutlineMail } from 'react-icons/hi'
import { RiLockPasswordLine } from 'react-icons/ri'
import { useState } from 'react'

const UpdateEmail = () => {
    const [wantToChangeEmail, setWantToChangeEmail] = useState(false)

    const closeHandler = () => {
        setWantToChangeEmail(false)
    }
    return (
        <Card
            css={{
                width: '100%',
                height: '100%',
                padding: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Grid
                md={12}
                justify="center"
                alignContent="center"
                alignItems="center"
                css={{
                    padding: '3.8rem',
                }}
            >
                <Button
                    color="success"
                    auto
                    flat
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
                width="20%"
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
