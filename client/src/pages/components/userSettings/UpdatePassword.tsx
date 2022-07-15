import {
    Button,
    Card,
    Checkbox,
    Grid,
    Input,
    Modal,
    Row,
    Text,
} from '@nextui-org/react'

import { RiLockPasswordLine } from 'react-icons/ri'
import { useState } from 'react'

interface UpdatePasswordProps {
    isDark: boolean
}

const UpdatePassword = ({ isDark }: UpdatePasswordProps) => {
    const [wantToChangePassword, setWantToChangePassword] = useState(false)

    const closeHandler = () => {
        setWantToChangePassword(false)
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
                    auto
                    flat={isDark}
                    color="success"
                    icon={<RiLockPasswordLine size="1rem" />}
                    onClick={() =>
                        setWantToChangePassword(!wantToChangePassword)
                    }
                >
                    Modifier mot de passe
                </Button>
            </Grid>
            <Modal
                closeButton
                preventClose
                aria-labelledby="change-password-modal"
                open={wantToChangePassword}
                onClose={closeHandler}
            >
                <Modal.Header>
                    <Text id="change-password-modal-title" size={18}>
                        Changement de mot de passe
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
                    <Row>
                        <Input.Password
                            aria-label="Password"
                            placeholder="Nouveau mot de passe"
                            bordered
                            color="primary"
                            width="100%"
                        />
                    </Row>
                    <Row>
                        <Input.Password
                            aria-label="Password"
                            placeholder="Confirmer mot de passe"
                            bordered
                            color="primary"
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

export default UpdatePassword
