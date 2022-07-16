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
    isMobile: boolean
}

const UpdatePassword = ({ isDark, isMobile }: UpdatePasswordProps) => {
    const [wantToChangePassword, setWantToChangePassword] = useState(false)

    const closeHandler = () => {
        setWantToChangePassword(false)
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
                md={12}
                justify="center"
                alignContent="center"
                alignItems="center"
                css={{
                    padding: isMobile ? '$10' : '3.8rem',
                }}
            >
                <Button
                    auto
                    flat={isDark && !isMobile}
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
                width={isMobile ? '90%' : '20%'}
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
