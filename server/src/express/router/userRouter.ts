import { Request, Response, Router } from 'express'
import {
    getAllFavoritesRecipeHandler,
    getSavedRecipesHandler,
    getUserByIDHandler,
} from '../api/queries/user/userQueries'

import { removeSavedRecipeHandler } from './../api/commands/user/userCommands'
import { saveRecipeToFavoriteHandler } from '../api/commands/user/userCommands'

class UserRouter {
    public readonly router: Router

    constructor() {
        this.router = Router()
        this.router.get('/:userID', [this.getUserByID])
        this.router.get('/getsavedrecipes/:userID', [this.getSavedRecipes])
        this.router.get('/getallfavoritesrecipe/:userID', [
            this.getAllFavoritesRecipe,
        ])
        this.router.post('/savetofavorite', this.saveRecipeToFavorite)
        this.router.post('/removesavedrecipe', this.removeSavedRecipe)
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
}

const createUserRouter: Router = new UserRouter().router
export default createUserRouter
