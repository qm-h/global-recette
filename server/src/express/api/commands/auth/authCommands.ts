import { AuthRequest, SuccessAuthUser } from './../../../../shared/types'
import { NextFunction, Request, Response } from 'express'

import { User } from '../../../../shared/types'
import authService from '../../../../services/authService'
import bcrypt from 'bcrypt'
import { supabase } from '../../../../database/supabase'

export const registerUser = async (req: Request, res: Response) => {
    const {
        username,
        firstname,
        lastname,
        email,
        password,
        avatar,
    }: AuthRequest = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error hashing password')
        } else {
            const existingUser = await supabase
                .from<User>('users')
                .select()
                .eq('email', email)
            if (!existingUser) {
                const user: AuthRequest = {
                    username,
                    firstname,
                    lastname,
                    email: email.toLowerCase(),
                    password: hash,
                    avatar,
                }
                const result = await supabase.from<User>('user').insert(user)
                if (result.status === 201) {
                    res.sendStatus(200)
                } else {
                    console.log(result.error)
                    res.sendStatus(500)
                }
            } else {
                res.status(400).send('User already exists')
            }
        }
    })
}

export const authenticateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body
    const user = await supabase.from<User>('user').select().eq('email', email)
    if (user.data.length === 0) {
        return res.sendStatus(404).send({
            message: 'Email ou Mot de passe incorrect !',
        })
    } else {
        bcrypt.compare(password, user.data[0].password, async (err, result) => {
            if (err) {
                console.log(err)
                return res.sendStatus(500)
            } else if (result) {
                const authUser: SuccessAuthUser = {
                    id: user.data[0].id,
                    username: user.data[0].username,
                    firstname: user.data[0].firstname,
                    lastname: user.data[0].lastname,
                    email: user.data[0].email,
                    avatar: user.data[0].avatar,
                }
                const generatedUserUUID =
                    await authService.generateAccessTokenMiddleware()
                req.body = {
                    userUUID: generatedUserUUID,
                    userID: authUser.id,
                }
                await authService.authWithSavedAccessUserUUID(req, res, next)
                res.status(200).send({
                    user: authUser,
                    accessUUID: generatedUserUUID,
                })
            } else {
                res.sendStatus(401)
            }
        })
    }
}

export const updateUserQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    const query = `UPDATE user SET name = '${responseQuery.name}', email = '${responseQuery.email}', password = '${responseQuery.password}' WHERE id = '${responseQuery.id}'`
    return query
}

export const deleteUserQuery = (id: number) =>
    `DELETE FROM user WHERE id = '${id}'`
