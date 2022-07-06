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

import { CgPassword } from 'react-icons/cg'
import { resetPassword } from '../../../../router/authRouter'
import { useParams } from 'react-router-dom'
import { useState } from 'react'

const ResetPassword = () => {
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { token } = useParams()
    const { isDark } = useTheme()

    const handleResetPassword = async () => {
        if (password === confirmPassword) {
            setIsLoading(true)
            await resetPassword({ password, token })
                .then((res) => {
                    setIsLoading(false)
                    if (res.status === 200) {
                        toasterSuccessCommon(isDark, res.message)
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
                    {isLoading ? (
                        <Button
                            rounded
                            shadow
                            disabled
                            auto
                            color="primary"
                            size="xl"
                        >
                            En cours <Loading />
                        </Button>
                    ) : (
                        <Button
                            color="primary"
                            flat
                            disabled={
                                password !== confirmPassword ||
                                password === '' ||
                                confirmPassword === ''
                                    ? true
                                    : false
                            }
                            onPress={() => handleResetPassword()}
                        >
                            Confirmer
                        </Button>
                    )}
                </Grid>
            </Grid.Container>
        </Container>
    )
}

export default ResetPassword
