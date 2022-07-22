import { NextFunction, Request, Response, Router } from 'express'
import {
    followingHandler,
    removeSavedRecipeHandler,
    saveCoverImageUUIDHandler,
    unfollowingHandler,
    updateAvatarHandler,
    updateCoverImageHandler,
    uploadCoverImageHandler,
} from './../api/commands/user/userCommands'
import {
    getAllFavoritesRecipeHandler,
    getFollowingUserHandler,
    getSavedRecipesHandler,
    getUserByIDHandler,
    getUserCoverImageHandler,
} from '../api/queries/user/userQueries'

import AuthService from '../../services/authService'
import { saveRecipeToFavoriteHandler } from '../api/commands/user/userCommands'

class UserRouter {
    public readonly router: Router

    constructor() {
        this.router = Router()
        this.router.get(
            '/:userID',
            (req: Request, res: Response, next: NextFunction) =>
                AuthService.verifyAccessJWTToken(req, res, next),
            [this.getUserByID]
        )
        this.router.get('/following/:username', [this.getFollowingUser])
        this.router.post('/unfollowing', [this.unfollowingUser])
        this.router.post('/follow', (req: Request, res: Response) => [
            this.followingUser(req, res),
        ])
        this.router.get(
            '/getsavedrecipes/:userID',
            (req: Request, res: Response, next: NextFunction) =>
                AuthService.verifyAccessJWTToken(req, res, next),
            [this.getSavedRecipes]
        )
        this.router.get(
            '/getallfavoritesrecipe/:userID',
            (req: Request, res: Response, next: NextFunction) =>
                AuthService.verifyAccessJWTToken(req, res, next),
            [this.getAllFavoritesRecipe]
        )
        this.router.post('/savetofavorite', this.saveRecipeToFavorite)
        this.router.post('/removesavedrecipe', this.removeSavedRecipe)
        this.router.put('/updateavatar', this.updateAvatar)
        this.router.get('/coverimage/:userID', this.getUserCoverImage)
        this.router.post('/uploadcoverimage', this.uploadCoverImage)
        this.router.post('/savecoverimageuuid', this.saveCoverImageUUID)
        this.router.put('/updatecoverimage', this.updateCoverImage)
    }

    getUserByID(req: Request, res: Response) {
        return getUserByIDHandler(req, res)
    }

    private saveRecipeToFavorite(req: Request, res: Response) {
        return saveRecipeToFavoriteHandler(req, res)
    }

    private getSavedRecipes(req: Request, res: Response) {
        return getSavedRecipesHandler(req, res)
    }

    private removeSavedRecipe(req: Request, res: Response) {
        return removeSavedRecipeHandler(req, res)
    }

    private getAllFavoritesRecipe(req: Request, res: Response) {
        return getAllFavoritesRecipeHandler(req, res)
    }

    private getFollowingUser(req: Request, res: Response) {
        return getFollowingUserHandler(req, res)
    }
    private followingUser(req: Request, res: Response) {
        return followingHandler(req, res)
    }
    private unfollowingUser(req: Request, res: Response) {
        return unfollowingHandler(req, res)
    }
    private updateAvatar(req: Request, res: Response) {
        return updateAvatarHandler(req, res)
    }
    private getUserCoverImage(req: Request, res: Response) {
        return getUserCoverImageHandler(req, res)
    }
    private uploadCoverImage(req: Request, res: Response) {
        return uploadCoverImageHandler(req, res)
    }
    private saveCoverImageUUID(req: Request, res: Response) {
        return saveCoverImageUUIDHandler(req, res)
    }
    private updateCoverImage(req: Request, res: Response) {
        return updateCoverImageHandler(req, res)
    }
}

const createUserRouter: Router = new UserRouter().router
export default createUserRouter
