import { Button, Input, Loading, Row } from '@nextui-org/react'

import { HiOutlineMail } from 'react-icons/hi'
import { MdPassword } from 'react-icons/md'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'

interface Props {
    handleConnection: (email: string, password: string) => void
    isLoading: boolean
    isDark: boolean
    setEmail: (email: string) => void
    email: string
    setPassword: (password: string) => void
    password: string
    handleValidation: (fields: string, value: string) => string | boolean
    isInvalidForm: boolean
    isInvalidEmail: boolean
    isInvalidPassword: boolean
    isInvalidEmailMessage: string
    isInvalidPasswordMessage: string
    isMobile: boolean
}

const ConnectionForm = ({
    handleConnection,
    isLoading,
    isDark,
    email,
    setEmail,
    password,
    setPassword,
    handleValidation,
    isInvalidForm,
    isInvalidEmail,
    isInvalidPassword,
    isInvalidEmailMessage,
    isInvalidPasswordMessage,
    isMobile,
}: Props) => {
    return (
        <>
            <Row
                justify="center"
                align="center"
                css={{ marginTop: isMobile ? '' : '$10', marginBottom: '$10' }}
            >
                <Input
                    width={isMobile ? '90%' : '50%'}
                    type="email"
                    animated
                    clearable
                    onBlur={() => handleValidation('email', email)}
                    color={isInvalidEmail ? 'error' : 'primary'}
                    helperColor={isInvalidEmail ? 'error' : 'default'}
                    helperText={isInvalidEmail ? isInvalidEmailMessage : ' '}
                    status={isInvalidEmail ? 'error' : 'default'}
                    aria-label="Email"
                    placeholder="Entrer votre email"
                    contentLeft={<HiOutlineMail />}
                    value={email}
                    bordered={isDark || isMobile}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Row>
            <Row
                justify="center"
                align="center"
                css={{ marginTop: isMobile ? '' : '$10', marginBottom: '$10' }}
            >
                <Input.Password
                    width={isMobile ? '90%' : '50%'}
                    animated
                    aria-label="Password"
                    required
                    onBlur={() => handleValidation('password', password)}
                    color={isInvalidPassword ? 'error' : 'primary'}
                    helperColor={isInvalidPassword ? 'error' : 'default'}
                    helperText={
                        isInvalidPassword ? isInvalidPasswordMessage : ' '
                    }
                    status={isInvalidPassword ? 'error' : 'default'}
                    type="password"
                    clearable
                    bordered={isDark || isMobile}
                    placeholder="Entrer votre mot de passe"
                    value={password}
                    contentLeft={<MdPassword />}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Row>
            <Row
                justify="center"
                align="center"
                css={{
                    marginTop: isMobile ? '' : '$10',
                    marginBottom: isMobile ? '' : '$10',
                }}
            >
                {!isLoading ? (
                    <Button
                        auto
                        color="success"
                        disabled={isInvalidForm}
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
