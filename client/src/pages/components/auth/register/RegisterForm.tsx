import {
    Button,
    Card,
    Grid,
    Loading,
    Row,
    Text,
    useTheme,
} from '@nextui-org/react'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../utils/theme/toaster'
import { useEffect, useState } from 'react'

import RegisterFormBody from './RegisterFormBody'
import { UserRegister } from '../../../../../../server/src/shared/types'
import checkField from '../../../../utils/auth/checkField'
import { randomAvatar } from '../../../../utils/randomAvatar'
import { registerUser } from '../../../../router/authRouter'
import toast from 'react-hot-toast'
import { isMobile } from 'react-device-detect'

interface RegisterFormProps {
    noAccount: (val: boolean) => void
    handleValidation: (fields: string, value: string) => string | boolean
    setIsInvalidUsername: (val: boolean) => void
    setIsInvalidUsernameMessage: (val: string) => void
    setIsInvalidFirstname: (val: boolean) => void
    setIsInvalidFirstnameMessage: (val: string) => void
    setIsInvalidLastname: (val: boolean) => void
    setIsInvalidLastnameMessage: (val: string) => void
    setIsInvalidEmail: (val: boolean) => void
    setIsInvalidEmailMessage: (val: string) => void
    setIsInvalidPassword: (val: boolean) => void
    setIsInvalidPasswordMessage: (val: string) => void
    setIsInvalidForm: (val: boolean) => void
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
    isInvalidForm: boolean
}
const RegisterForm = ({
    noAccount,
    handleValidation,
    setIsInvalidUsername,
    setIsInvalidUsernameMessage,
    setIsInvalidFirstname,
    setIsInvalidFirstnameMessage,
    setIsInvalidLastname,
    setIsInvalidLastnameMessage,
    setIsInvalidEmail,
    setIsInvalidEmailMessage,
    setIsInvalidPassword,
    setIsInvalidPasswordMessage,
    setIsInvalidForm,
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
    isInvalidForm,
}: RegisterFormProps) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [firstname, setFirstname] = useState<string>('')
    const [lastname, setLastname] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isDark } = useTheme()

    const handleRegister = async () => {
        const emptyFiedls =
            checkField.emptyField('username', username) &&
            checkField.emptyField('firstname', firstname) &&
            checkField.emptyField('lastname', lastname)
        checkField.emptyField('email', email) &&
            checkField.emptyField('password', password)

        if (emptyFiedls === true) {
            const usernameIsValid = checkField.notHaveSpecialChar(username)
            const firstnameIsValid = checkField.notHaveSpecialChar(firstname)
            const lastnameIsValid = checkField.notHaveSpecialChar(lastname)
            const emailIsValid = checkField.email(email)
            const passwordIsValid = checkField.password(password)
            if (
                typeof usernameIsValid === 'boolean' &&
                typeof firstnameIsValid === 'boolean' &&
                typeof lastnameIsValid === 'boolean' &&
                typeof emailIsValid === 'boolean' &&
                typeof passwordIsValid === 'boolean'
            ) {
                const generated_avatar = randomAvatar()
                const user: UserRegister = {
                    username,
                    password,
                    email,
                    firstname,
                    lastname,
                    generated_avatar,
                }
                setIsLoading(true)
                await registerUser(user)
                    .then((res) => {
                        setIsLoading(false)
                        console.log(res.status, res.message)
                        switch (res.status) {
                            case 200:
                                toasterSuccessCommon(
                                    isDark,
                                    'Inscription réussie, un email de confirmation vous a été envoyé'
                                )
                                noAccount(false)
                                break
                            case 400:
                                toasterErrorCommon(
                                    isDark,
                                    'Cet email est déjà utilisé'
                                )
                                break
                            default:
                                toasterErrorCommon(
                                    isDark,
                                    'Une erreur est survenue'
                                )
                                break
                        }
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

    useEffect(() => {
        if (
            username &&
            lastname &&
            firstname &&
            email &&
            password &&
            isInvalidEmail === false &&
            isInvalidPassword === false &&
            isInvalidUsername === false &&
            isInvalidFirstname === false &&
            isInvalidLastname === false
        ) {
            setIsInvalidForm(false)
        }
    }, [
        email,
        isInvalidEmail,
        isInvalidFirstname,
        isInvalidLastname,
        isInvalidPassword,
        isInvalidUsername,
        password,
        setIsInvalidForm,
    ])

    return (
        <Card
            css={{ w: isMobile ? '90%' : '40%', mt: isMobile ? '$20' : '$24' }}
            variant={isMobile ? 'flat' : 'shadow'}
        >
            <Card.Header>
                <Row justify="center">
                    <Text h2={!isMobile} h3={isMobile}>
                        Créer Mon Compte 🔥
                    </Text>
                </Row>
            </Card.Header>
            <Card.Body>
                <RegisterFormBody
                    isMobile={isMobile}
                    isDark={isDark}
                    username={username}
                    firstname={firstname}
                    lastname={lastname}
                    email={email}
                    password={password}
                    handleValidation={handleValidation}
                    isInvalidUsername={isInvalidUsername}
                    isInvalidUsernameMessage={isInvalidUsernameMessage}
                    isInvalidFirstname={isInvalidFirstname}
                    isInvalidFirstnameMessage={isInvalidFirstnameMessage}
                    isInvalidLastname={isInvalidLastname}
                    isInvalidLastnameMessage={isInvalidLastnameMessage}
                    isInvalidEmail={isInvalidEmail}
                    isInvalidEmailMessage={isInvalidEmailMessage}
                    isInvalidPassword={isInvalidPassword}
                    isInvalidPasswordMessage={isInvalidPasswordMessage}
                    setUsername={setUsername}
                    setFirstname={setFirstname}
                    setLastname={setLastname}
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
            </Card.Body>
            <Card.Footer>
                <Grid.Container>
                    <Grid
                        xs={12}
                        md={12}
                        lg={12}
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            color="success"
                            auto={isLoading}
                            flat
                            disabled={isInvalidForm || isLoading}
                            onPress={() => handleRegister()}
                        >
                            {isLoading ? (
                                <Loading color="currentColor" size="sm" />
                            ) : (
                                'Créer'
                            )}
                        </Button>
                    </Grid>
                    <Grid
                        xs={12}
                        md={12}
                        lg={12}
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            light
                            auto
                            color="success"
                            className="hoverText"
                            css={{ color: isDark ? '#313538' : '#bebebe' }}
                            onClick={() => noAccount(false)}
                        >
                            Je possède déjà un compte
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Footer>
        </Card>
    )
}
export default RegisterForm
