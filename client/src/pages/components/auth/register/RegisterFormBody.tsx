import { Button, Input, Row } from '@nextui-org/react'

import { CgPassword } from 'react-icons/cg'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import generatePassword from '../../../../utils/auth/generatePassword'

interface RegisterFormBodyProps {
    isDark: boolean
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    handleValidation: (field: string, value: string) => string | boolean
    isInvalidUsername: boolean
    isInvalidUsernameMessage: string
    isInvalidFirstname: boolean
    isInvalidFirstnameMessage: string
    isInvalidLastname: boolean
    isInvalidLastnameMessage: string
    isInvalidEmail: boolean
    isInvalidEmailMessage: string
    isInvalidPassword: boolean
    isInvalidPasswordMessage: string
    setUsername: (value: string) => void
    setFirstname: (value: string) => void
    setLastname: (value: string) => void
    setEmail: (value: string) => void
    setPassword: (value: string) => void
}

const RegisterFormBody = ({
    isDark,
    username,
    firstname,
    lastname,
    email,
    password,
    handleValidation,
    isInvalidUsername,
    isInvalidUsernameMessage,
    isInvalidFirstname,
    isInvalidFirstnameMessage,
    isInvalidLastname,
    isInvalidLastnameMessage,
    isInvalidEmail,
    isInvalidEmailMessage,
    isInvalidPassword,
    isInvalidPasswordMessage,
    setUsername,
    setFirstname,
    setLastname,
    setEmail,
    setPassword,
}: RegisterFormBodyProps) => {
    const generatePasswordRegister = () => {
        setPassword(generatePassword())
    }

    return (
        <>
            <Row
                justify="center"
                align="center"
                css={{ marginTop: '$10', marginBottom: '$10' }}
            >
                <Input
                    width="50%"
                    bordered={isDark ? true : false}
                    animated
                    aria-label="Lastname"
                    required
                    clearable
                    onBlur={() => handleValidation('lastname', lastname)}
                    color={isInvalidLastname ? 'error' : 'primary'}
                    helperColor={isInvalidLastname ? 'error' : 'default'}
                    helperText={
                        isInvalidLastname ? isInvalidLastnameMessage : ' '
                    }
                    status={isInvalidLastname ? 'error' : 'default'}
                    labelPlaceholder="Entrer votre nom"
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
                    bordered={isDark ? true : false}
                    animated
                    required
                    aria-label="Firstname"
                    onBlur={() => handleValidation('firstname', firstname)}
                    color={isInvalidFirstname ? 'error' : 'primary'}
                    helperColor={isInvalidFirstname ? 'error' : 'default'}
                    helperText={
                        isInvalidFirstname ? isInvalidFirstnameMessage : ' '
                    }
                    status={isInvalidFirstname ? 'error' : 'default'}
                    clearable
                    labelPlaceholder="Entrer votre prénom"
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
                    animated
                    clearable
                    aria-label="Username"
                    labelPlaceholder="Entrer un nom d'utilisateur"
                    value={username}
                    contentLeft={<FaUserAstronaut />}
                    bordered={isDark ? true : false}
                    required={true}
                    onBlur={() => handleValidation('username', username)}
                    color={isInvalidUsername ? 'error' : 'primary'}
                    helperColor={isInvalidUsername ? 'error' : 'default'}
                    helperText={
                        isInvalidUsername ? isInvalidUsernameMessage : ' '
                    }
                    status={isInvalidUsername ? 'error' : 'default'}
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
                    clearable
                    animated
                    aria-label="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    contentLeft={<HiOutlineMail />}
                    onBlur={() => handleValidation('email', email)}
                    color={isInvalidEmail ? 'error' : 'primary'}
                    helperColor={isInvalidEmail ? 'error' : 'default'}
                    helperText={isInvalidEmail ? isInvalidEmailMessage : ' '}
                    status={isInvalidEmail ? 'error' : 'default'}
                    labelPlaceholder="Entrer votre email"
                    value={email}
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
                    onBlur={() => handleValidation('password', password)}
                    color={isInvalidPassword ? 'error' : 'primary'}
                    helperColor={isInvalidPassword ? 'error' : 'default'}
                    helperText={
                        isInvalidPassword ? isInvalidPasswordMessage : ' '
                    }
                    status={isInvalidPassword ? 'error' : 'default'}
                    aria-label="Password"
                    bordered={isDark ? true : false}
                    contentLeft={<CgPassword />}
                    required
                    labelPlaceholder="Entrer votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Row>
            <Row justify="center" align="center">
                <Button
                    auto
                    size="sm"
                    light
                    color="success"
                    onClick={() => generatePasswordRegister()}
                >
                    Générer un mot de passe ?
                </Button>
            </Row>
        </>
    )
}
export default RegisterFormBody
