import {
    Button,
    Card,
    Grid,
    Input,
    Loading,
    Row,
    Text,
    Tooltip,
} from '@nextui-org/react'
import { FaEmpire, FaJediOrder } from 'react-icons/fa'

import { HiOutlineMail } from 'react-icons/hi'
import { TiWarning } from 'react-icons/ti'

const DeleteAccount = ({
    wantToDeleteAccount,
    setWantToDeleteAccount,
    isInvalidEmail,
    isInvalidEmailMessage,
    email,
    setEmail,
    authUser,
    isDark,
    handleDeleteAccount,
    isLoading,
}) => {
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
                alignItems="center"
                css={{ m: '$0', pb: '$0' }}
            >
                <Text
                    color="warning"
                    css={{
                        textAlign: 'center',
                        fontSize: '$xl3',
                    }}
                    b
                >
                    WARNING <TiWarning size="1.5rem" />
                </Text>
            </Grid>
            {wantToDeleteAccount ? (
                <>
                    <Text color="warning">
                        Veuillez confirmé en entrant votre email :
                        <b
                            style={{
                                color: isDark ? '#fff' : '#000',
                                marginLeft: '1rem',
                            }}
                        >
                            {authUser.email}
                        </b>
                    </Text>
                    <Input
                        css={{ m: '$5' }}
                        width="50%"
                        placeholder="Entre votre email ou Copiez/Collez votre email"
                        animated
                        bordered
                        contentLeft={<HiOutlineMail />}
                        clearable
                        color={isInvalidEmail ? 'error' : 'warning'}
                        helperColor={isInvalidEmail ? 'error' : 'default'}
                        helperText={
                            isInvalidEmail ? isInvalidEmailMessage : ' '
                        }
                        status={isInvalidEmail ? 'error' : 'default'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Row justify="center">
                        <Tooltip
                            content={'Annuler la suppression'}
                            placement="bottom"
                            css={{
                                fontWeight: 'bold',
                            }}
                            color={isDark ? 'success' : 'default'}
                            contentColor={isDark ? 'default' : 'success'}
                        >
                            <Button
                                color="success"
                                icon={<FaJediOrder size="1.5rem" />}
                                flat
                                auto
                                css={{ m: '$5' }}
                                onClick={() =>
                                    setWantToDeleteAccount(!wantToDeleteAccount)
                                }
                            >
                                Ordre Jedi
                            </Button>
                        </Tooltip>
                        <Tooltip
                            content={'Supprimer le compte'}
                            placement="bottom"
                            css={{
                                fontWeight: 'bold',
                            }}
                            color={isDark ? 'warning' : 'default'}
                            contentColor={isDark ? 'default' : 'warning'}
                        >
                            <Button
                                color="warning"
                                iconRight={<FaEmpire size="1.5rem" />}
                                flat
                                auto
                                disabled={isLoading}
                                css={{ m: '$5' }}
                                onPress={() => handleDeleteAccount(email)}
                            >
                                {isLoading ? (
                                    <Loading
                                        type="points-opacity"
                                        color="currentColor"
                                    />
                                ) : (
                                    'Empire Galactique'
                                )}
                            </Button>
                        </Tooltip>
                    </Row>
                </>
            ) : (
                <Grid md={12}>
                    <Button
                        color="warning"
                        light
                        onPress={() =>
                            setWantToDeleteAccount(!wantToDeleteAccount)
                        }
                    >
                        Supprimer mon compte
                    </Button>
                </Grid>
            )}
        </Card>
    )
}

export default DeleteAccount
