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
    isMobile,
}) => {
    return (
        <Card
            css={{
                width: isMobile && !wantToDeleteAccount ? '70%' : '100%',
                height: '100%',
                padding: isMobile ? '$10' : '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            variant={isMobile ? 'flat' : 'shadow'}
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
                        fontSize: isMobile ? '$xl' : '$xl3',
                    }}
                    b
                >
                    WARNING <TiWarning size={isMobile ? '1rem' : '1.5rem'} />
                </Text>
            </Grid>
            {wantToDeleteAccount ? (
                <>
                    <Text color="warning">
                        Veuillez confirmé en entrant votre email :
                        {isMobile && <br />}
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
                        width={isMobile ? '100%' : '50%'}
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
                        <Button
                            color="success"
                            icon={<FaJediOrder size="1.5rem" />}
                            flat={isDark && !isMobile}
                            auto
                            css={{ m: '$5' }}
                            onClick={() =>
                                setWantToDeleteAccount(!wantToDeleteAccount)
                            }
                        >
                            Annuler
                        </Button>
                        <Button
                            color="warning"
                            iconRight={<FaEmpire size="1.5rem" />}
                            flat={isDark && !isMobile}
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
                                'Supprimer'
                            )}
                        </Button>
                    </Row>
                </>
            ) : (
                <Grid xs={12} md={12}>
                    <Button
                        color="warning"
                        flat={isDark && !isMobile}
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
