import {
    Button,
    Card,
    Input,
    Loading,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'

import { User } from '../../../../../../server/src/shared/types'
import { randomAvatar } from '../../../../lib/utils/randomAvatar'
import { registerUser } from '../../../../router/authRouter'
import toast from 'react-hot-toast'
import { useState } from 'react'

interface Props {
    noAccount: (val: boolean) => void
}
const RegisterForm = ({ noAccount }: Props) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { isDark } = useTheme()
    const validateEmail = () => {
        return email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)
    }

    const handleRegister = async () => {
        if (validateEmail()) {
            if (username && password && email && firstname && lastname) {
                const avatar = randomAvatar()
                const user: User = {
                    id: 0,
                    username,
                    password,
                    email,
                    firstname,
                    lastname,
                    avatar,
                }
                setIsLoading(true)
                await registerUser(user)
                    .then((res) => {
                        setIsLoading(false)
                        res === 200
                            ? toast.success('Vous êtes inscrit !', {
                                  duration: 5000,
                              })
                            : toast.error('Création du compte échouée', {
                                  duration: 3000,
                              })
                        noAccount(false)
                    })
                    .catch((err) => {
                        console.log(err)
                        toast.error('Une erreur est survenu', {
                            duration: 3000,
                        })
                    })
            } else {
                console.log('email invalid')
            }
        }
    }

    return (
        <Card css={{ w: '50%' }}>
            <Card.Header>
                <Row justify="center">
                    <Text css={{}} h2>
                        Créer Mon Compte 🔥
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
                        animated
                        clearable
                        aria-label="Username"
                        label="Nom d'utilisateur"
                        placeholder="Entrer un nom d'utilisateur"
                        value={username}
                        bordered={isDark ? true : false}
                        required={true}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Row>
                <Row
                    justify="center"
                    align="center"
                    css={{ marginTop: '$10', marginBottom: '$10' }}
                >
                    <Input
                        width="50%"
                        bordered={isDark ? true : false}
                        label="Nom"
                        animated
                        aria-label="Lastname"
                        required
                        clearable
                        placeholder="Entrer votre nom"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                    />
                </Row>
                <Row
                    justify="center"
                    align="center"
                    css={{ marginTop: '$10', marginBottom: '$10' }}
                >
                    <Input
                        width="50%"
                        label="Prénom"
                        bordered={isDark ? true : false}
                        animated
                        required
                        aria-label="Firstname"
                        clearable
                        placeholder="Entrer votre prénom"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                    />
                </Row>
                <Row
                    justify="center"
                    align="center"
                    css={{ marginTop: '$10', marginBottom: '$10' }}
                >
                    <Input
                        width="50%"
                        bordered={isDark ? true : false}
                        clearable
                        animated
                        aria-label="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        label="Email"
                        value={email}
                        placeholder="Entrer votre email"
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
                        clearable
                        aria-label="Password"
                        bordered={isDark ? true : false}
                        required
                        label="Mot de passe"
                        placeholder="Entrer votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Row>
                <Row justify="center" align="center">
                    {!isLoading ? (
                        <Button
                            color="primary"
                            auto
                            ghost
                            onPress={() => handleRegister()}
                        >
                            Créer 🚀
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
                        onClick={() => noAccount(false)}
                    >
                        Je possède déjà un compte
                    </Button>
                </Row>
            </Card.Body>
        </Card>
    )
}
export default RegisterForm
