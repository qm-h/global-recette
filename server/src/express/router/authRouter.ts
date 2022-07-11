import { Request, Response, Router } from 'express'

import AuthService from '../../services/authService'

class AuthRouter {
    public readonly router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', [])
        this.router.post('/signup', (req: Request, res: Response) => [
            this.registerUser(req, res),
        ])
        this.router.post('/signin', (req: Request, res: Response) => [
            this.authenticateUser(req, res),
        ])
        this.router.post('/signout', (req: Request, res: Response) => [
            this.logout(req, res),
        ]),
            this.router.post(
                '/forgot-password',
                (req: Request, res: Response) => [this.forgotPassword(req, res)]
            ),
            this.router.post(
                '/send-email-confirmation',
                (req: Request, res: Response) => [
                    this.sendEmailConfirmation(req, res),
                ]
            )
        this.router.post('/reset-password', (req: Request, res: Response) => [
            this.resetPassword(req, res),
        ])
        this.router.post('/confirm-email', (req: Request, res: Response) => [
            this.confirmEmail(req, res),
        ])
        this.router.post('/has-uuid', (req: Request, res: Response) => [
            this.hasSavedUUID(req, res),
        ])
        this.router.post(
            '/delete-account/:userID',
            AuthService.verifyAccessUUIDToken,
            (req: Request, res: Response) => [this.deleteAccount(req, res)]
        )
    }

    private registerUser(req: Request, res: Response) {
        return AuthService.registerUser(req, res)
    }

    private authenticateUser(req: Request, res: Response) {
        return AuthService.authUser(req, res)
    }

    private forgotPassword(req: Request, res: Response) {
        return AuthService.forgotPassword(req, res)
    }

    private resetPassword(req: Request, res: Response) {
        return AuthService.resetPassword(req, res)
    }

    private logout(req: Request, res: Response) {
        const { userID } = req.body
        const isLogout = AuthService.deleteToken(userID)
        if (isLogout) {
            return res.sendStatus(200)
        }
        return res.sendStatus(500)
    }

    private sendEmailConfirmation(req: Request, res: Response) {
        return AuthService.confirmationRegisterEmail(req, res)
    }

    private confirmEmail(req: Request, res: Response) {
        return AuthService.confirmationRegister(req, res)
    }

    private hasSavedUUID(req: Request, res: Response) {
        return AuthService.hasSavedUUID(req, res)
    }

    private deleteAccount(req: Request, res: Response) {
        return AuthService.deleteAccount(req, res)
    }
}

const createAuthRouter: Router = new AuthRouter().router
export default createAuthRouter
