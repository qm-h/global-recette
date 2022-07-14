import { NextFunction, Request, Response, Router } from 'express'
import {
    createRecipeHandler,
    deleteRecipeHandler,
    publishRecipeHandler,
    unpublishRecipeHandler,
    uploadImageHandler,
} from '../api/commands/recipe/recipeCommands'
import {
    getAllPublishedRecipeByUserIDHandler,
    getAllRecipesWithUserHandler,
    getRecipeByIDHandler,
    getRecipeByNameHandler,
    getRecipeByUserIDHandler,
    getRecipeImageHandler,
    getRecipeUserHandler,
} from '../api/queries/recipe/recipeQueries'

import AuthService from '../../services/authService'
import { insertRecipeIngredientHandler } from '../api/commands/recipe/recipeIngredientCommands'
import { savedImageUUIDHandler } from './../api/commands/recipe/recipeCommands'

class RecipeRouter {
    public readonly router: Router
    private readonly deleteRoute: string = '/delete'
    constructor() {
        this.router = Router()
        this.router.get('/', this.getAllRecipesWithUser)
        this.router.post(
            '/user/:userID',
            (req: Request, res: Response, next: NextFunction) =>
                AuthService.verifyAccessJWTToken(req, res, next),
            AuthService.verifyAccessUUIDToken,
            this.getAllRecipesByUserID
        )
        this.router.post(
            '/user/published/:userID',
            this.getAllPublishedRecipeByUserID
        )
        this.router.get('/:id', (_req: Request, res: Response) =>
            this.getRecipeById(_req, res)
        )
        this.router.post('/name', (_req: Request, res: Response) =>
            this.getRecipeByName(_req, res)
        )
        this.router.get('/user/:id', [this.getRecipeUser])
        this.router.post('/createrecipe', (_req: Request, res: Response) =>
            this.createRecipeRouter(_req, res)
        )
        this.router.post(
            '/insertrecipeingredient',
            (_req: Request, res: Response) =>
                this.insertRecipeIngredient(_req, res)
        )
        this.router.post('/publish', (_req: Request, res: Response) =>
            this.publishRecipe(_req, res)
        )
        this.router.post('/unpublish', (_req: Request, res: Response) =>
            this.unpublishRecipe(_req, res)
        )
        this.router.delete(
            `${this.deleteRoute}/:id`,
            (_req: Request, res: Response) => this.removeRecipe(_req, res)
        )
        this.router.get('/image/:name', (_req: Request, res: Response) =>
            this.getRecipeImage(_req, res)
        )
        this.router.post('/uploadimage', (_req: Request, res: Response) =>
            this.savedImage(_req, res)
        )
        this.router.post('/saveimageuuid', this.savedImageUUID)
    }

    private async getAllRecipesWithUser(req: Request, res: Response) {
        return getAllRecipesWithUserHandler(req, res)
    }

    private async getAllRecipesByUserID(req: Request, res: Response) {
        return getRecipeByUserIDHandler(req, res)
    }

    private async getAllPublishedRecipeByUserID(req: Request, res: Response) {
        return getAllPublishedRecipeByUserIDHandler(req, res)
    }

    private getRecipeById(req: Request, res: Response) {
        return getRecipeByIDHandler(req, res)
    }

    private getRecipeUser(req: Request, res: Response) {
        return getRecipeUserHandler(req, res)
    }

    private getRecipeByName(req: Request, res: Response) {
        return getRecipeByNameHandler(req, res)
    }

    private getRecipeImage(req: Request, res: Response) {
        return getRecipeImageHandler(req, res)
    }

    private createRecipeRouter(req: Request, res: Response) {
        return createRecipeHandler(req, res)
    }

    private savedImage(req: Request, res: Response) {
        return uploadImageHandler(req, res)
    }

    private savedImageUUID(req: Request, res: Response) {
        return savedImageUUIDHandler(req, res)
    }

    private insertRecipeIngredient(req: Request, res: Response) {
        return insertRecipeIngredientHandler(req, res)
    }

    private publishRecipe(req: Request, res: Response) {
        return publishRecipeHandler(req, res)
    }
    private unpublishRecipe(req: Request, res: Response) {
        return unpublishRecipeHandler(req, res)
    }

    private removeRecipe(req: Request, res: Response) {
        return deleteRecipeHandler(req, res)
    }
}

const createRecipeRouter: Router = new RecipeRouter().router
export default createRecipeRouter
