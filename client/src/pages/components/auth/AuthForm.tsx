import {
    Button,
    Card,
    Input,
    Loading,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'

import { User } from '../../../../../server/src/shared/types'
import { authentication } from '../../../api/authRouter'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

interface Props {
    noAccount: (val: boolean) => void
    userHasAuthenticated: (val: boolean) => void
    setUser: (user: User) => void
}

const Loginform = ({ noAccount, userHasAuthenticated, setUser }: Props) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const { isDark } = useTheme()
    const handleConnection = async () => {
        if (email && password) {
            setIsLoading(true)
            await authentication({ email, password }).then((res) => {
                setIsLoading(false)
                if (res) {
                    toast.success('Vous êtes connecté !', {
                        duration: 5000,
                    })

                    userHasAuthenticated(true)
                    setUser(res)
                    navigate('/')
                } else {
                    toast.error('Connexion échouée', { duration: 3000 })
                }
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
                        <Button onPress={() => handleConnection()}>
                            Connexion ✨
                        </Button>
                    ) : (
                        <Button
                            disabled
                            auto
                            bordered
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

export default Loginform
