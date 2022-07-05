import {
    Button,
    Card,
    Checkbox,
    Grid,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'
import { forgotPassword, userAuth } from '../../../router/authRouter'
import {
    toasterErrorAuth,
    toasterErrorCommon,
    toasterSuccessAuth,
    toasterSuccessCommon,
    toasterUserNotFound,
} from '../../../lib/theme/toaster'

import ConfirmationModal from './confirmationRegister/ConfirmationModal'
import ConnectionForm from './connection/ConnectionForm'
import ForgotPwdModal from './resetPassword/ForgotPwdModal'
import { SuccessAuthUser } from '../../../../../server/src/shared/types'
import { createCookies } from '../../../lib/utils/create'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface Props {
    noAccount: (val: boolean) => void
    setIsAuthenticated: (val: boolean) => void
    setUser: (user: SuccessAuthUser) => void
    setUserUUID: (token: string) => void
}

const AuthForm = ({
    noAccount,
    setIsAuthenticated,
    setUser,
    setUserUUID,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openForgotModal, setOpenForgotModal] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const navigate = useNavigate()
    const { isDark } = useTheme()

    const handleConnection = async (email, password) => {
        if (email && password) {
            setIsLoading(true)
            await userAuth({ email, password })
                .then((res) => {
                    setIsLoading(false)
                    switch (res.status) {
                        case 200:
                            if (rememberMe) {
                                createCookies('user', res.user, 7)
                                createCookies('userUUID', res.accessUUID, 7)
                            } else {
                                createCookies('user', res.user, 1)
                                createCookies('userUUID', res.accessUUID, 1)
                            }
                            setUserUUID(res.accessUUID)
                            setUser(res.user)
                            setIsAuthenticated(true)
                            toasterSuccessAuth(isDark)
                            navigate('/')
                            break
                        case 401:
                            setOpenConfirm(true)
                            break
                        case 404:
                            toasterUserNotFound(isDark)
                            break
                        default:
                            break
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    toasterErrorAuth(isDark)
                })
        }
    }

    const handleForgotPassword = async (email) => {
        if (email) {
            setIsLoading(true)
            await forgotPassword(email)
                .then((res) => {
                    setIsLoading(false)
                    setOpenForgotModal(false)
                    if (res.status === 200) {
                        toasterSuccessCommon(
                            isDark,
                            'Un email vous a été envoyé afin de réinitialiser votre mot de passe'
                        )
                    } else {
                        toasterErrorCommon(isDark, 'Une erreur est survenue')
                    }
                })
                .catch(() => {
                    setOpenForgotModal(false)
                    setIsLoading(false)
                    toasterErrorCommon(isDark, 'Une erreur est survenue')
                })
        }
    }

    return (
        <Card css={{ w: '50%' }}>
            <Card.Header>
                <Row justify="center">
                    <Text css={{}} h2>
                        Connexion
                    </Text>
                </Row>
            </Card.Header>
            <Card.Divider />
            <Card.Body>
                <ConnectionForm
                    handleConnection={handleConnection}
                    isLoading={isLoading}
                    isDark={isDark}
                    setEmail={setEmail}
                    email={email}
                />
                <ForgotPwdModal
                    isLoading={isLoading}
                    setOpenForgotModal={setOpenForgotModal}
                    visible={openForgotModal}
                    handleForgotPassword={handleForgotPassword}
                />
                <ConfirmationModal
                    email={email}
                    isDark={isDark}
                    openConfirm={openConfirm}
                    setOpenConfirm={setOpenConfirm}
                />
            </Card.Body>
            <Card.Footer>
                <Grid.Container justify="space-between" alignItems="center">
                    <Grid md={3} justify="center">
                        <Checkbox
                            color="success"
                            size="sm"
                            defaultChecked={false}
                            isSelected={rememberMe}
                            onChange={setRememberMe}
                        >
                            <Text
                                size={14}
                                className="hoverText"
                                css={
                                    rememberMe
                                        ? { color: '#19C964' }
                                        : {
                                              color: isDark
                                                  ? '#313538'
                                                  : '#bebebe',
                                          }
                                }
                            >
                                Remember me
                            </Text>
                        </Checkbox>
                    </Grid>
                    <Grid md={5} justify="center">
                        <Button
                            light
                            auto
                            color="success"
                            className="hoverText"
                            css={{ color: isDark ? '#313538' : '#bebebe' }}
                            onClick={() => noAccount(true)}
                        >
                            Je ne possède pas de compte 🥹
                        </Button>
                    </Grid>
                    <Grid md={4} justify="center">
                        <Button
                            light
                            auto
                            color="success"
                            className="hoverText"
                            css={{ color: isDark ? '#313538' : '#bebebe' }}
                            onClick={() => setOpenForgotModal(true)}
                        >
                            Mot de passe oublié ?
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}

export default AuthForm
