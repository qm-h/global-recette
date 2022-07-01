import {
    AuthResponse,
    SuccessAuthUser,
    User,
} from '../../../../../server/src/shared/types'
import {
    Button,
    Card,
    Input,
    Loading,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'
import {
    toasterErrorAuth,
    toasterSuccessAuth,
    toasterUserNotFound,
} from '../../../lib/theme/toaster'

import Cookie from 'js-cookie'
import { createCookies } from '../../../lib/utils/create'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { userAuth } from '../../../router/authRouter'

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
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { isDark } = useTheme()

    const handleConnection = async () => {
        if (email && password) {
            setIsLoading(true)
            await userAuth({ email, password })
                .then((res) => {
                    setIsLoading(false)
                    if (res) {
                        setIsAuthenticated(true)
                        createCookies('user', res.user, 7)
                        createCookies('userUUID', res.accessUUID, 7)
                        setUserUUID(res.accessUUID)
                        setUser(res.user)
                        toasterSuccessAuth(isDark)
                        navigate('/')
                    } else {
                        toasterUserNotFound(isDark)
                    }
                })
                .catch(() => {
                    setIsLoading(false)
                    toasterErrorAuth(isDark)
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
                <Row
                    justify="center"
                    align="center"
                    css={{ marginTop: '$10', marginBottom: '$10' }}
                >
                    <Input
                        width="50%"
                        type="email"
                        animated
                        clearable
                        color="primary"
                        aria-label="Email"
                        placeholder="Entrer votre email"
                        value={email}
                        bordered={isDark ? true : false}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Row>
                <Row
                    justify="center"
                    align="center"
                    css={{ marginTop: '$10', marginBottom: '$10' }}
                >
                    <Input.Password
                        width="50%"
                        animated
                        aria-label="Password"
                        required
                        color="primary"
                        type="password"
                        clearable
                        bordered={isDark ? true : false}
                        placeholder="Entrer votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Row>
                <Row
                    justify="center"
                    align="center"
                    css={{ marginTop: '$10', marginBottom: '$10' }}
                >
                    {!isLoading ? (
                        <Button
                            rounded
                            shadow
                            onPress={() => handleConnection()}
                        >
                            Connexion ✨
                        </Button>
                    ) : (
                        <Button
                            disabled
                            auto
                            rounded
                            color="success"
                            css={{ px: '$13' }}
                        >
                            <Loading
                                type="points"
                                color="currentColor"
                                size="sm"
                            />
                        </Button>
                    )}
                </Row>
                <Row justify="center" align="center">
                    <Button
                        light
                        auto
                        color="primary"
                        onClick={() => noAccount(true)}
                    >
                        Je ne possède pas de compte 🥹
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default AuthForm
