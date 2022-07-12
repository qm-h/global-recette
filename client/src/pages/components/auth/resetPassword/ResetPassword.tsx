import {
    Button,
    Container,
    Grid,
    Input,
    Loading,
    Text,
    useTheme,
} from '@nextui-org/react'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../utils/theme/toaster'
import { useNavigate, useParams } from 'react-router-dom'

import { CgPassword } from 'react-icons/cg'
import { resetPassword } from '../../../../router/authRouter'
import { useState } from 'react'

const ResetPassword = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { token } = useParams()
    const { isDark } = useTheme()
    const navigate = useNavigate()

    const handleResetPassword = async () => {
        if (password === confirmPassword) {
            setIsLoading(true)
            await resetPassword({ password, token })
                .then((res) => {
                    setIsLoading(false)
                    if (res.status === 200) {
                        toasterSuccessCommon(isDark, res.message)
                        navigate('/login')
                    } else {
                        toasterErrorCommon(isDark, res.message)
                    }
                })
                .catch((err) => {
                    setIsLoading(false)
                    console.log(err)
                    toasterErrorCommon(isDark, 'Une erreur est survenue')
                })
                .finally(() => {
                    setPassword('')
                    setConfirmPassword('')
                })
        } else {
            toasterErrorCommon(isDark, 'Les mots de passe ne correspondent pas')
        }
    }
    return (
        <Container
            css={{
                h: '100vh',
                w: '90%',
            }}
            display="flex"
            justify="center"
            alignItems="center"
            responsive
        >
            <Grid.Container gap={4}>
                <Grid md={12} justify="center">
                    <Text h2 b>
                        Rénitialisation de mot de passe
                    </Text>
                </Grid>
                <Grid md={12} justify="center">
                    <Input.Password
                        clearable
                        bordered={isDark ? true : false}
                        color="primary"
                        shadow={!isDark ? true : false}
                        value={password}
                        label="Mot de passe"
                        size="xl"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Entrer votre mot de passe"
                        contentLeft={<CgPassword />}
                    />
                </Grid>
                <Grid md={12} justify="center">
                    <Input.Password
                        clearable
                        bordered={isDark ? true : false}
                        shadow={!isDark ? true : false}
                        color="primary"
                        size="xl"
                        label="Confirmer votre mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirmer votre Mot de passe"
                        contentLeft={<CgPassword />}
                    />
                </Grid>
                <Grid md={12} justify="center">
                    <Button
                        color="success"
                        flat
                        disabled={
                            isLoading ||
                            password !== confirmPassword ||
                            password === '' ||
                            confirmPassword === ''
                                ? true
                                : false
                        }
                        onPress={() => handleResetPassword()}
                    >
                        {isLoading ? (
                            <Loading color="currentColor" size="sm" />
                        ) : (
                            'Réinitialiser'
                        )}
                    </Button>
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default ResetPassword
