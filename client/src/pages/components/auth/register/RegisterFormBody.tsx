import { Button, Input, Row } from '@nextui-org/react'

import { CgPassword } from 'react-icons/cg'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import generatePassword from '../../../../utils/auth/generatePassword'
import { isMobile } from 'react-device-detect'

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
    isMobile: boolean
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
    isMobile,
}: RegisterFormBodyProps) => {
    const generatePasswordRegister = () => {
        setPassword(generatePassword())
    }

    return (
        <>
            <Row
                justify="center"
                align="center"
                css={{
                    marginTop: isMobile ? '$5' : '$10',
                    marginBottom: '$10',
                }}
            >
                <Input
                    width={isMobile ? '90%' : '70%'}
                    bordered={isDark || isMobile}
                    animated
                    aria-label="Lastname"
                    required
                    clearable
                    onBlur={() => handleValidation('lastname', lastname)}
                    color={isInvalidLastname ? 'error' : 'primary'}
                    helperColor={isInvalidLastname ? 'error' : 'primary'}
                    helperText={
                        isInvalidLastname ? isInvalidLastnameMessage : ' '
                    }
                    title=""
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
                    width={isMobile ? '90%' : '70%'}
                    bordered={isDark || isMobile}
                    animated
                    required
                    aria-label="Firstname"
                    onBlur={() => handleValidation('firstname', firstname)}
                    color={isInvalidFirstname ? 'error' : 'primary'}
                    helperColor={isInvalidFirstname ? 'error' : 'primary'}
                    helperText={
                        isInvalidFirstname ? isInvalidFirstnameMessage : ' '
                    }
                    status={isInvalidFirstname ? 'error' : 'default'}
                    clearable
                    labelPlaceholder="Entrer votre prénom"
                    value={firstname}
                    title=""
                    onChange={(e) => setFirstname(e.target.value)}
                />
            </Row>
            <Row
                justify="center"
                align="center"
                css={{ marginTop: '$10', marginBottom: '$10' }}
            >
                <Input
                    width={isMobile ? '90%' : '70%'}
                    animated
                    clearable
                    aria-label="Username"
                    labelPlaceholder="Entrer un nom d'utilisateur"
                    value={username}
                    contentLeft={<FaUserAstronaut />}
                    bordered={isDark || isMobile}
                    required={true}
                    onBlur={() => handleValidation('username', username)}
                    color={isInvalidUsername ? 'error' : 'primary'}
                    helperColor={isInvalidUsername ? 'error' : 'primary'}
                    helperText={
                        isInvalidUsername ? isInvalidUsernameMessage : ' '
                    }
                    status={isInvalidUsername ? 'error' : 'default'}
                    onChange={(e) => setUsername(e.target.value)}
                    title=""
                />
            </Row>
            <Row
                justify="center"
                align="center"
                css={{ marginTop: '$10', marginBottom: '$10' }}
            >
                <Input
                    width={isMobile ? '90%' : '70%'}
                    bordered={isDark || isMobile}
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
                    title=""
                />
            </Row>
            <Row
                justify="center"
                align="center"
                css={{ marginTop: '$10', marginBottom: '$10' }}
            >
                <Input.Password
                    width={isMobile ? '90%' : '70%'}
                    animated
                    title=""
                    clearable
                    onBlur={() => handleValidation('password', password)}
                    color={isInvalidPassword ? 'error' : 'primary'}
                    helperColor={isInvalidPassword ? 'error' : 'default'}
                    helperText={
                        isInvalidPassword ? isInvalidPasswordMessage : ' '
                    }
                    status={isInvalidPassword ? 'error' : 'default'}
                    aria-label="Password"
                    bordered={isDark || isMobile}
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
