import {
    Button,
    Card,
    Checkbox,
    Grid,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'
import { forgotPassword, userAuth } from '../../../../router/authRouter'
import {
    toasterErrorAuth,
    toasterErrorCommon,
    toasterSuccessAuth,
    toasterSuccessCommon,
    toasterUserNotFound,
} from '../../../../utils/theme/toaster'
import { useEffect, useState } from 'react'

import ConfirmationModal from '../confirmationRegister/ConfirmationModal'
import ConnectionForm from './ConnectionForm'
import ForgotPwdModal from '../resetPassword/ForgotPwdModal'
import { SuccessAuthUser } from '../../../../../../server/src/shared/types'
import checkField from '../../../../utils/auth/checkField'
import { createCookies } from '../../../../utils/create'
import { useNavigate } from 'react-router-dom'

interface Props {
    noAccount: (val: boolean) => void
    setIsAuthenticated: (val: boolean) => void
    handleValidation: (fields: string, value: string) => string | boolean
    setUser: (user: SuccessAuthUser) => void
    setUserUUID: (token: string) => void
    setIsInvalidForm: (val: boolean) => void
    setIsInvalidEmail: (val: boolean) => void
    setIsInvalidEmailMessage: (val: string) => void
    setIsInvalidPassword: (val: boolean) => void
    setIsInvalidPasswordMessage: (val: string) => void
    isInvalidForm: boolean
    isInvalidEmail: boolean
    isInvalidEmailMessage: string
    isInvalidPassword: boolean
    isInvalidPasswordMessage: string
}

const AuthForm = ({
    noAccount,
    setIsAuthenticated,
    handleValidation,
    setUser,
    setUserUUID,
    setIsInvalidForm,
    setIsInvalidEmail,
    setIsInvalidEmailMessage,
    setIsInvalidPassword,
    setIsInvalidPasswordMessage,
    isInvalidForm,
    isInvalidEmail,
    isInvalidEmailMessage,
    isInvalidPassword,
    isInvalidPasswordMessage,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openForgotModal, setOpenForgotModal] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const navigate = useNavigate()
    const { isDark } = useTheme()

    const handleConnection = async (email, password) => {
        const emptyFiedls =
            checkField.emptyField('email', email) &&
            checkField.emptyField('password', password)
        if (typeof emptyFiedls === 'boolean') {
            const emailIsValid = checkField.email(email)
            const passwordIsValid = checkField.password(password)
            if (
                typeof emailIsValid === 'boolean' &&
                typeof passwordIsValid === 'boolean'
            ) {
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
                                toasterErrorCommon(
                                    isDark,
                                    'Aucun utilisateur trouvé,\n avez-vous créé un compte ?'
                                )
                                break
                            case 400:
                                toasterErrorAuth(isDark)
                                break
                            default:
                                toasterErrorCommon(
                                    isDark,
                                    'Une erreur est survenue, contactez nous si le problème persiste'
                                )
                                break
                        }
                    })
                    .catch((err) => {
                        setIsLoading(false)
                        console.log(err)
                        toasterErrorAuth(isDark)
                    })
            }
        }
    }

    const handleForgotPassword = async (email) => {
        if (email) {
            setIsLoading(true)
            await forgotPassword(email)
                .then((res) => {
                    setIsLoading(false)
                    switch (res.status) {
                        case 200:
                            setOpenForgotModal(false)
                            return toasterSuccessCommon(
                                isDark,
                                'Un email vous a été envoyé afin de réinitialiser votre mot de passe'
                            )

                        case 404:
                            return toasterUserNotFound(isDark)
                        case 400:
                            return toasterErrorAuth(isDark)
                        case 401:
                            return toasterErrorAuth(isDark)
                        default:
                            return toasterErrorCommon(
                                isDark,
                                'Une erreur est survenue'
                            )
                    }
                })
                .catch(() => {
                    setOpenForgotModal(false)
                    setIsLoading(false)
                    toasterErrorCommon(isDark, 'Une erreur est survenue')
                })
        }
    }

    useEffect(() => {
        if (
            email &&
            password &&
            isInvalidEmail === false &&
            isInvalidPassword === false
        ) {
            setIsInvalidForm(false)
        }
    }, [email, password, isInvalidEmail, isInvalidPassword, setIsInvalidForm])

    return (
        <Card css={{ w: '70%' }}>
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
                    setPassword={setPassword}
                    email={email}
                    password={password}
                    handleValidation={handleValidation}
                    isInvalidForm={isInvalidForm}
                    isInvalidEmail={isInvalidEmail}
                    isInvalidEmailMessage={isInvalidEmailMessage}
                    isInvalidPassword={isInvalidPassword}
                    isInvalidPasswordMessage={isInvalidPasswordMessage}
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
