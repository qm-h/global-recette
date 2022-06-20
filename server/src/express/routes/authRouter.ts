import { Request, Response, Router } from 'express'
import {
    authenticateUserQuery,
    registerUserQuery,
} from '../api/commands/auth/authCrudCommands'

class AuthRouter {
    public readonly router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', [])
        this.router.post('/register', (req: Request, res: Response) => [
            this.registerUser(req, res),
        ])
        this.router.post('/login', (req: Request, res: Response) => [
            this.authenticateUser(req, res),
        ])
    }

    private registerUser(req: Request, res: Response) {
        return registerUserQuery(req, res)
    }

    private authenticateUser(req: Request, res: Response) {
        return authenticateUserQuery(req, res)
    }
}

const createAuthRouter: Router = new AuthRouter().router
export default createAuthRouter
