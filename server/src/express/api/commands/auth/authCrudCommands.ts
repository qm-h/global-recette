import { Request, Response } from 'express'

import { AuthRequest } from './../../../../shared/types'
import { User } from '../../../../shared/types'
import bcrypt from 'bcrypt'
import { supabase } from '../../../../database/supabase'

export const registerUserQuery = async (req: Request, res: Response) => {
    const { username, firstname, lastname, email, password } = req.body
    bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
            console.log(err)
            res.status(500).send('Error hashing password')
        } else {
            const user: AuthRequest = {
                username,
                firstname,
                lastname,
                email,
                password: hash,
            }
            console.log(user)

            const result = await supabase.from<User>('user').insert(user)
            if (result.status === 201) {
                res.sendStatus(200)
            } else {
                console.log(result.error)
                res.sendStatus(500)
            }
        }
    })
}

export const authenticateUserQuery = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await supabase.from<User>('user').select().eq('email', email)
    if (user.data.length === 0) {
        res.sendStatus(404)
    } else {
        bcrypt.compare(password, user.data[0].password, (err, result) => {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            } else if (result) {
                res.locals.user = user.data[0]
                res.send(user.data[0])
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
