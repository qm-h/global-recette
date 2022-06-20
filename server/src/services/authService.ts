import { NextFunction, Request, Response } from 'express'

const authService = {
    isAuthenticated: (_req: Request, res: Response, next: NextFunction) => {
        console.log('isAuthenticated')
        console.log(res.locals.user)

        if (res.locals.user !== undefined) {
            next()
        } else {
            res.redirect('/')
        }
    },
}

export default authService
