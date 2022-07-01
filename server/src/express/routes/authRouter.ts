import { NextFunction, Request, Response, Router } from 'express'
import {
    authenticateUser,
    registerUser,
} from '../api/commands/auth/authCommands'

import authService from '../../services/authService'

class AuthRouter {
    public readonly router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', [])
        this.router.post('/signup', (req: Request, res: Response) => [
            this.registerUser(req, res),
        ])
        this.router.post(
            '/signin',
            (req: Request, res: Response, next: NextFunction) => [
                this.authenticateUser(req, res, next),
            ]
        )
        this.router.post('/signout', (req: Request, res: Response) => [
            this.logout(req, res),
        ])
    }

    private registerUser(req: Request, res: Response) {
        return registerUser(req, res)
    }

    private authenticateUser(req: Request, res: Response, next: NextFunction) {
        return authenticateUser(req, res, next)
    }

    private logout(req: Request, res: Response) {
        authService.deleteToken(req, res, () => {
            res.sendStatus(200)
        })
    }
}

const createAuthRouter: Router = new AuthRouter().router
export default createAuthRouter
