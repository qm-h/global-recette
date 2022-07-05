import { Button, Input, Loading, Row } from '@nextui-org/react'

import { HiOutlineMail } from 'react-icons/hi'
import { MdPassword } from 'react-icons/md'
import { useState } from 'react'

interface Props {
    handleConnection: (email: string, password: string) => void
    isLoading: boolean
    isDark: boolean
    setEmail: (email: string) => void
    email: string
}

const ConnectionForm = ({
    handleConnection,
    isLoading,
    isDark,
    email,
    setEmail,
}: Props) => {
    const [password, setPassword] = useState<string>('')

    return (
        <>
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
                    contentLeft={<HiOutlineMail />}
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
                    contentLeft={<MdPassword />}
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
                        auto
                        color="success"
                        onPress={() => handleConnection(email, password)}
                    >
                        Connexion ✨
                    </Button>
                ) : (
                    <Button disabled auto css={{ px: '$13' }}>
                        <Loading color="currentColor" size="sm" />
                    </Button>
                )}
            </Row>
        </>
    )
}
export default ConnectionForm
