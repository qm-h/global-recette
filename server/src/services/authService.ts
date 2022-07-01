import { NextFunction, Request, Response } from 'express'

import { TokenUserAccess } from '../shared/types'
import { supabase } from '../database/supabase'
import { v4 as uuidv4 } from 'uuid'

const authService = {
    generateAccessTokenMiddleware: () => {
        return uuidv4()
    },
    saveToken: async (req: Request, res: Response) => {
        const { userUUID, userID } = req.body
        const data: TokenUserAccess = {
            token_user_access: userUUID,
            user_id: userID,
            created_at: Date.now(),
        }
        const result = await supabase.from('token_access').insert(data)
        if (result.status === 400) {
            console.log(result.error)
            res.sendStatus(500)
        }
    },
    deleteToken: async (req: Request, res: Response, next: NextFunction) => {
        const { userID } = req.body
        const result = await supabase
            .from('token_access')
            .delete()
            .eq('user_id', userID)
        if (result.status === 400) {
            console.log(result.error)
            res.sendStatus(500)
        }
        next()
    },
    verifyAccessTokenMiddleware: async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { userUUID, userID } = req.body
        if (!userID) {
            return res.status(401).json({ message: 'Error. Need a userUUID' })
        }
        const result = await supabase
            .from('token_access')
            .select('token_user_access')
            .eq('token_user_access', userUUID)
        if (result.data.length === 0) {
            return res.status(401).json({ message: 'Error. Invalid userUUID' })
        }
        next()
    },
    authWithSavedAccessUserUUID: async (req, res, next) => {
        const { userID } = req.body
        if (userID) {
            const result = await supabase
                .from('token_access')
                .select()
                .eq('user_id', req.body.userID)

            switch (result.status) {
                case 400:
                    console.log(result.error)
                    console.log('result', result)
                    break
                case 200:
                    if (result.data.length === 0) {
                        await authService.saveToken(req, res)
                    } else {
                        await authService.deleteToken(req, res, next)
                        await authService.saveToken(req, res)
                    }
            }
        } else {
            console.log('User not authenticated', req.userID)
        }
    },
    hasAuthenticatedWithNoUserUUID: async (req, res) => {
        const { userID } = req.body
        if (!userID) {
            return res.status(401).json({ message: 'Error. Need a userUUID' })
        }
        const result = await supabase
            .from('token_access')
            .select('token_user_access')
            .eq('user_id', userID)
        if (result.data.length === 0) {
            return res.status(401).json({ message: 'Error. Invalid userUUID' })
        }
    },
}

export default authService
