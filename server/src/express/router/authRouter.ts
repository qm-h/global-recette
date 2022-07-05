import { Request, Response, Router } from 'express'

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
            authService.isConfirmed,
            (req: Request, res: Response) => [this.authenticateUser(req, res)]
        )
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
    }

    private registerUser(req: Request, res: Response) {
        return authService.registerUser(req, res)
    }

    private authenticateUser(req: Request, res: Response) {
        return authService.authUser(req, res)
    }

    private forgotPassword(req: Request, res: Response) {
        return authService.forgotPassword(req, res)
    }

    private resetPassword(req: Request, res: Response) {
        return authService.resetPassword(req, res)
    }

    private logout(req: Request, res: Response) {
        const { userID } = req.body
        const isLogout = authService.deleteToken(userID)
        if (isLogout) {
            return res.sendStatus(200)
        }
        return res.sendStatus(500)
    }

    private sendEmailConfirmation(req: Request, res: Response) {
        return authService.confirmationRegisterEmail(req, res)
    }

    private confirmEmail(req: Request, res: Response) {
        return authService.confirmationRegister(req, res)
    }

    private hasSavedUUID(req: Request, res: Response) {
        return authService.hasSavedUUID(req, res)
    }
}

const createAuthRouter: Router = new AuthRouter().router
export default createAuthRouter
