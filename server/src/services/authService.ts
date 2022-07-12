import {
    AuthRequest,
    MailerOptions,
    Recipe,
    TokenUserAccess,
    User,
    UserConfirmation,
    UserResetPassword,
    UserToken,
} from '../shared/types'
import { NextFunction, Request, Response } from 'express'

import CryptoJS from 'crypto-js'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { logger } from '../server'
import path from 'path'
import { sendEmail } from '../shared/utils/sendMethods'
import supabase from '../supabase/supabase'
import { v4 as uuidv4 } from 'uuid'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const AuthService = {
    base64url: (str: string) => {
        let base64Url = CryptoJS.enc.Base64.stringify(
            CryptoJS.enc.Utf8.parse(str)
        )
        base64Url = base64Url.replace(/=+$/, '')
        base64Url = base64Url.replace(/\+/g, '-')
        base64Url = base64Url.replace(/\//g, '_')
        return base64Url
    },
    generateAccessUUIDToken: () => {
        return uuidv4()
    },
    generateAccessJWTToken: (user: UserToken) => {
        const header = {
            alg: 'HS256',
            typ: 'JWT',
        }

        const stringifiedHeader = CryptoJS.enc.Utf8.parse(
            JSON.stringify(header)
        )
        const encodedHeader = AuthService.base64url(stringifiedHeader)

        const data = {
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
        }

        const stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data))
        const encodedData = AuthService.base64url(stringifiedData)

        const token = encodedHeader + '.' + encodedData
        const secreKey = crypto.randomBytes(32).toString('hex')
        const secret = crypto.createHmac('sha256', secreKey).digest('hex')

        const signatureHmac = CryptoJS.HmacSHA256(token, secret)
        const signature = AuthService.base64url(signatureHmac)

        const signedToken = token + '.' + signature

        return signedToken
    },
    registerUser: async (req: Request, res: Response) => {
        const {
            username,
            firstname,
            lastname,
            email,
            password,
            generated_avatar,
        }: AuthRequest = req.body
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                logger.error(`${err}`)
                return res.status(500).send('Error hashing password')
            } else {
                const existingUser = await supabase
                    .from<User>('user')
                    .select()
                    .eq('email', email)

                if (existingUser.data.length === 0) {
                    const user: AuthRequest = {
                        username,
                        firstname,
                        lastname,
                        email: email.toLowerCase(),
                        password: hash,
                        generated_avatar,
                    }
                    const token = AuthService.generateAccessUUIDToken()
                    const result = await supabase
                        .from<User>('user')
                        .insert(user)
                    if (result.status === 201) {
                        const sendEmailConfirmation =
                            await AuthService.saveConfirmationRegisterEmail(
                                email,
                                token
                            )
                        return sendEmailConfirmation
                            ? res.status(200).send({
                                  status: 200,
                                  message: 'Email sending',
                              })
                            : res.status(500).send({
                                  status: 500,
                                  message: 'Error sending email',
                              })
                    } else {
                        logger.error(`${result.error}`)
                        return res.send({
                            status: 500,
                            message: 'Error creating user',
                        })
                    }
                } else {
                    return res.send({
                        status: 400,
                        message: 'Email already exists',
                    })
                }
            }
        })
    },
    authUser: async (req: Request, res: Response) => {
        const { email, password }: User = req.body
        const user = await supabase
            .from<User>('user')
            .select()
            .eq('email', email)

        if (user.data.length === 0) {
            logger.error(`User not found`)
            return res.send({ status: 404, message: 'User not found' })
        }
        if (user['data'][0].access_jwt_token === null) {
            logger.error(`User not confirmed`)
            return res.send({ status: 401, message: 'User not confirmed' })
        }
        const userData = user.data[0]
        if (bcrypt.compareSync(password, userData.password)) {
            const uuidToken = AuthService.generateAccessUUIDToken()
            const payload = {
                user: { id: userData.id, username: userData.username },
            }
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET)
            const isAuth = await AuthService.authWithSavedAccessUserUUID(
                userData.id,
                uuidToken
            )
            if (isAuth) {
                res.cookie('jwt_token', jwtToken, {
                    httpOnly: true,
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                    sameSite: 'strict',
                })
                return res.status(200).send({
                    status: 200,
                    message: 'User authenticated',
                    accessUUID: uuidToken,
                    user: {
                        id: userData.id,
                        username: userData.username,
                        firstname: userData.firstname,
                        lastname: userData.lastname,
                        email: userData.email,
                        generated_avatar: userData.generated_avatar,
                        followers: userData.followers,
                        following: userData.following,
                        biography: userData.biography,
                    },
                })
            } else {
                logger.error(`Error authenticating user`)
                return res.send({
                    status: 500,
                    message: 'Error authenticating user',
                })
            }
        } else {
            logger.error(`Password incorrect`)
            return res.send({ status: 400, message: 'Password incorrect' })
        }
    },
    saveToken: async (userID: number, userUUID: string) => {
        const data: TokenUserAccess = {
            token_user_access: userUUID,
            user_id: userID,
            created_at: Date.now(),
        }
        const result = await supabase.from('token_access').insert(data)
        if (result.status === 400) {
            logger.error(`saveTokenError: ${JSON.stringify(result)}`)
            return false
        }
        return true
    },
    isConfirmed: async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.body
        const user = await supabase
            .from<User>('user')
            .select()
            .eq('email', email)
        if (user.data.length === 0) {
            return res.sendStatus(404)
        }
        if (user.data[0].confirmed === false) {
            return res.send({ status: 401 })
        }
        next()
    },
    deleteToken: async (userID) => {
        const result = await supabase
            .from('token_access')
            .delete()
            .eq('user_id', userID)
        if (result.status === 400) {
            logger.error(`deleteTokenError: ${JSON.stringify(result)}`)
            return false
        }
        return true
    },
    verifyAccessUUIDToken: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { userUUID, userID } = req.body

        if (!userID) {
            logger.error('userID is undefined')
            return res.status(401).send({ message: 'Error. Need a userUUID' })
        }
        const result = await supabase
            .from('token_access')
            .select('token_user_access')
            .eq('token_user_access', userUUID)
        if (result.data.length === 0) {
            logger.error('userUUID is undefined')
            return res.status(401).send({ message: 'Error. Invalid userUUID' })
        }
        next()
    },
    authWithSavedAccessUserUUID: async (userID, userUUID) => {
        if (userID) {
            const result = await supabase
                .from('token_access')
                .select()
                .eq('user_id', userID)
            if (result.data.length === 0) {
                return AuthService.saveToken(userID, userUUID)
            }
            const token = result.data[0].token_user_access
            if (token) {
                AuthService.deleteToken(userID)
                return AuthService.saveToken(userID, userUUID)
            }
        } else {
            logger.error('userID is undefined')
            return false
        }
    },
    verifyAccessJWTToken: async (
        req: Request,
        res: Response,
        next?: NextFunction
    ) => {
        const { userID } = req.params
        const result = await supabase
            .from('user')
            .select('access_jwt_token')
            .eq('id', userID)
        const token = result.data[0]?.access_jwt_token
        if (token === null) {
            logger.error('access_jwt_token is undefined')
            return res.send({ status: 403, message: 'Not Authorize' })
        }
        next()
    },
    hasAuthenticatedWithNoUserUUID: async (req: Request, res: Response) => {
        const { userID } = req.body
        if (!userID) {
            logger.error('User not authenticated')
            return res
                .status(401)
                .send({ message: 'Error. User not authenticated' })
        }
        const result = await supabase
            .from('token_access')
            .select('token_user_access')
            .eq('user_id', userID)
        if (result.data.length === 0) {
            logger.error('Error. Invalid userUUID')
            return res.status(401).send({ message: 'Error. Invalid userUUID' })
        }
    },
    hasSavedUUID: async (req: Request, res: Response) => {
        const { uuid } = req.body
        if (!uuid) {
            return res.send({
                status: 403,
                message: 'Error. User not authenticated',
            })
        }
        const result = await supabase
            .from('user_confirmation')
            .select()
            .eq('token', uuid)

        if (result.data.length === 0) {
            logger.error('Error. Invalid userUUID')
            return res.send({ status: 403, message: 'Error. Invalid userUUID' })
        }
        return res.status(200).send({ status: 200, message: 'Has Token' })
    },
    saveConfirmationRegisterEmail: async (email, token) => {
        const data: UserConfirmation = {
            email,
            token,
            created_at: Date.now(),
        }
        logger.info(`Saving confirmation email for '${email}'`)
        const result = await supabase.from('user_confirmation').insert(data)
        logger.info(`${result.statusText}`)
        if (result.status === 400) {
            logger.error(`Error saving confirmation email for ${email}`)
        }
        const mailerOptions: MailerOptions = {
            from: 'Global Recette 🍔',
            to: email,
            subject: 'Confirmation de votre compte',
            text:
                'Bonjour, \n\n' +
                'Merci de cliquer sur le lien ci-dessous pour confirmer votre compte : \n\n' +
                `${process.env.FRONT_URL}/confirmation/${token} \n\n` +
                'Cordialement, \n\n' +
                "L'équipe Global Recette 🍔",
            html:
                ' <p>Bonjour,</p>' +
                '<p>Merci de cliquer sur le lien ci-dessous pour confirmer votre compte :</p>' +
                `<a href="${process.env.FRONT_URL}/confirmation/${token}">${process.env.FRONT_URL}/confirmation/${token}</a>` +
                '<p>Cordialement,</p>' +
                "<p>L'équipe Global Recette 🍔</p>",
        }
        const isSendEmail = await sendEmail(mailerOptions)
            .then(() => {
                return true
            })
            .catch(() => {
                return false
            })
        return isSendEmail ? true : false
    },
    confirmationRegisterEmail: async (req: Request, res: Response) => {
        const { email } = req.body
        if (!email) {
            return res.status(401).send({ message: 'Error. Need an email' })
        }

        const result = await supabase
            .from('user_confirmation')
            .select()
            .eq('email', email)

        if (result.data.length === 0) {
            logger.error(`Error. Invalid email ${email}`)
            return res.status(401).send({ message: 'Error. Invalid email' })
        }
        const user = await supabase
            .from<User>('user')
            .select()
            .eq('email', result.data[0].email)
        logger.info(`USER: ${JSON.stringify(user)}`)

        if (user.data[0].firstname === undefined) {
            logger.error(`Error. User not found ${email}`)
            return res.status(401).send({ message: 'Error. User not found' })
        }

        const token = result.data[0].token
        const mailOptions = {
            from: '"Global Recette 🍔"',
            to: email,
            subject: 'Confirmation Email',
            text:
                'Bonjour, \n\n' +
                'Merci de cliquer sur le lien ci-dessous pour confirmer votre compte : \n\n' +
                `${process.env.FRONT_URL}/confirmation/${token} \n\n` +
                'Cordialement, \n\n' +
                "L'équipe Global Recette 🍔",
            html:
                ' <p>Bonjour,</p>' +
                '<p>Merci de cliquer sur le lien ci-dessous pour confirmer votre compte :</p>' +
                `<a href="${process.env.FRONT_URL}/confirmation/${token}">${process.env.FRONT_URL}/confirmation/${token}</a>` +
                '<p>Cordialement,</p>' +
                "<p>L'équipe Global Recette 🍔</p>",
        }
        try {
            await sendEmail(mailOptions).then(() => {
                return res
                    .status(200)
                    .send({ status: 200, message: 'Email sent' })
            })
        } catch (error) {
            logger.error(`Error sending email to ${email}`)
            logger.error(`${error}`)
            return res
                .status(401)
                .send({ message: 'Error. Error sending email' })
        }
    },
    confirmationRegister: async (req, res) => {
        const { token } = req.body
        if (!token) {
            return res.status(401).send({ message: 'Error. Need a token' })
        }
        const haveToken = await supabase
            .from('user_confirmation')
            .select('email')
            .eq('token', token)
        if (haveToken['data'].length === 0) {
            logger.error(`Error. Invalid token ${token}`)
            return res.status(401).send({ message: 'Error. Invalid token' })
        }
        const confirmedUser = await supabase
            .from('user')
            .select('email, username, firstname, lastname')
            .eq('email', haveToken.data[0].email)

        if (confirmedUser['data'].length === 0) {
            logger.error(`Error. User not found ${token}`)
            return res.status(401).send({ message: 'Error. User not found' })
        }
        const access_jwt_token = AuthService.generateAccessJWTToken({
            email: confirmedUser['data'][0].email,
            username: confirmedUser['data'][0].username,
            firstname: confirmedUser['data'][0].firstname,
            lastname: confirmedUser['data'][0].lastname,
        })

        const user = await supabase
            .from<User>('user')
            .update({
                confirmed: true,
                access_jwt_token: access_jwt_token,
            })
            .eq('email', haveToken['data'][0].email)
        if (user.data[0].firstname === undefined) {
            logger.error(`${user.error}`)
            return res.status(401).send({ message: 'Error. User not found' })
        }
        AuthService.deleteConfirmationRegisterEmail(token)
        return res.status(200).send({ status: 200, message: 'User confirmed' })
    },
    deleteConfirmationRegisterEmail: async (token) => {
        const result = await supabase
            .from('user_confirmation')
            .delete()
            .eq('token', token)
        if (result.status === 400) {
            logger.error(`Error deleting confirmation token for ${token}`)
        }
    },
    forgotPassword: async (req: Request, res: Response) => {
        const { email } = req.body
        const user = await supabase.from('user').select('id').eq('email', email)
        if (user.data.length === 0) {
            logger.error(`Error. User not found ${email}`)
            return res.status(401).send({ message: 'Error. User not found' })
        } else {
            const existingToken = await supabase
                .from('user_reset_password')
                .select()
                .eq('user_id', user.data[0].id)
            let savedToken
            const uuid = uuidv4()
            if (existingToken.data.length > 0) {
                await supabase
                    .from('user_reset_password')
                    .delete()
                    .eq('user_id', user.data[0].id)
                savedToken = await supabase
                    .from<UserResetPassword>('user_reset_password')
                    .insert({
                        user_id: user.data[0].id,
                        token: uuid,
                        created_at: Date.now(),
                    })
            } else {
                savedToken = await supabase
                    .from<UserResetPassword>('user_reset_password')
                    .insert({
                        user_id: user.data[0].id,
                        token: uuid,
                        created_at: Date.now(),
                    })
            }

            if (savedToken.status === 400) {
                logger.error(`${savedToken.error}`)
                return res
                    .status(401)
                    .send({ message: 'Error. Error saving token' })
            }
            const url = `${process.env.FRONT_URL}/reset-password/${uuid}`
            const mailOptions = {
                from: '"Global Recette 🍔"',
                to: process.env.EMAIL,
                subject: 'Réinitialisation de votre mot de passe',
                text:
                    'Bonjour, \n\n' +
                    'Merci de cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe : \n\n' +
                    `${url} \n\n` +
                    'Cordialement, \n\n' +
                    "L'équipe Global Recette 🍔",
                html:
                    ' <p>Bonjour,</p>' +
                    '<p>Merci de cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>' +
                    `<a href="${url}">${url}</a>` +
                    '<p>Cordialement,</p>' +
                    "<p>L'équipe Global Recette 🍔</p>",
            }
            try {
                await sendEmail(mailOptions).then(() => {
                    return res
                        .status(200)
                        .send({ status: 200, message: 'Email sent' })
                })
            } catch (error) {
                logger.error(`Error sending email to ${email}`)
                logger.error(`${error}`)
                return res
                    .status(401)
                    .send({ message: 'Error. Error sending email' })
            }
        }
    },
    resetPassword: async (req: Request, res: Response) => {
        const { password, token } = req.body
        const user = await supabase
            .from<UserResetPassword>('user_reset_password')
            .select()
            .eq('token', token)

        if (user.data.length === 0) {
            return res.status(401).send({ message: 'Error. Invalid token' })
        }
        req.params = {
            userID: `${user['data'][0].user_id}`,
        }
        await AuthService.verifyAccessJWTToken(req, res)

        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                logger.error(`${err}`)
                return res.sendStatus(500)
            } else {
                const result = await supabase
                    .from<User>('user')
                    .update({ password: hash })
                    .eq('id', user.data[0].user_id)
                if (result.status === 200) {
                    return res.status(200).send({
                        status: 200,
                        message: 'Mot de passe mis à jour',
                    })
                } else {
                    logger.error(`${result.error}`)
                    return res.sendStatus(500)
                }
            }
        })
    },
    deleteAccount: async (req: Request, res: Response) => {
        const { userID, email } = req.body
        const { jwt_token } = req.cookies

        jwt.verify(jwt_token, process.env.JWT_SECRET, async (err) => {
            if (err) {
                logger.error(`JwtVerifyError: ${err}`)
                return res.send({
                    status: 401,
                    message: 'Error. Invalid token',
                })
            } else {
                const recipeID = await supabase
                    .from<Recipe>('recipes')
                    .select('id')
                    .eq('created_by', userID)

                if (recipeID.data.length > 0) {
                    for (let i = 0; i < recipeID.data.length; i++) {
                        await supabase
                            .from('recipe_ingredient')
                            .delete()
                            .eq('recipe_id', recipeID['data'][0].id)
                        await supabase
                            .from<Recipe>('recipes')
                            .delete()
                            .eq('id', recipeID.data[i].id)
                    }
                }
                await supabase
                    .from<UserResetPassword>('user_reset_password')
                    .delete()
                    .eq('user_id', userID)
                await supabase
                    .from<UserConfirmation>('user_confirmation')
                    .delete()
                    .eq('email', email)
                await supabase
                    .from<TokenUserAccess>('user_token_access')
                    .delete()
                    .eq('user_id', userID)
                await supabase
                    .from('token_access')
                    .delete()
                    .eq('user_id', userID)
                const user = await supabase
                    .from<User>('user')
                    .delete()
                    .eq('id', userID)
                res.clearCookie('jwt_token')
                if (user.status === 200) {
                    return res.status(200).send({
                        status: 200,
                        message: 'User deleted',
                    })
                }
                logger.error(`DELETING ERROR: ${JSON.stringify(user.error)}`)
                return res.send({
                    status: 401,
                    message: 'Error. User not found',
                })
            }
        })
    },
}

export default AuthService
