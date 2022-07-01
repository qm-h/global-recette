import { Request, Response, Router } from 'express'
import {
    createRecipe,
    deleteRecipeQuery,
    publishRecipe,
    unpublishRecipe,
} from '../api/commands/recipe/recipeCommands'
import {
    getAllRecipesWithUser,
    getRecipeById,
    getRecipeByName,
    getRecipeByUserID,
} from '../api/queries/recipe/recipeQueries'

import authService from '../../services/authService'
import { insertRecipeIngredientHandler } from '../api/commands/recipe/recipeIngredientCommands'

class RecipeRouter {
    public readonly router: Router
    private readonly deleteRoute: string = '/delete'
    constructor() {
        this.router = Router()
        this.router.get('/', this.getAllRecipesWithUser)
        this.router.post(
            '/user/:id',
            authService.verifyAccessTokenMiddleware,
            this.getAllRecipesByUserID
        )
        this.router.get('/:id', (_req: Request, res: Response) =>
            this.getRecipeById(_req, res)
        )
        this.router.post('/name', (_req: Request, res: Response) =>
            this.getRecipeByName(_req, res)
        )
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
        this.router.put('/updaterecipe', (_req: Request, res: Response) =>
            this.updateRecipe(_req, res)
        )
        this.router.delete(
            `${this.deleteRoute}/:id`,
            (_req: Request, res: Response) => this.removeRecipe(_req, res)
        )
        this.router.delete(
            `${this.deleteRoute}/recipeingredient/:id`,
            (_req: Request, res: Response) =>
                this.removeRecipeIngredient(_req, res)
        )
    }

    private async getAllRecipesWithUser(req: Request, res: Response) {
        return getAllRecipesWithUser(req, res)
    }

    private async getAllRecipesByUserID(req: Request, res: Response) {
        return getRecipeByUserID(req, res)
    }

    private getRecipeById(req: Request, res: Response) {
        return getRecipeById(req, res)
    }

    private getRecipeByName(req: Request, res: Response) {
        return getRecipeByName(req, res)
    }

    private createRecipeRouter(req: Request, res: Response) {
        return createRecipe(req, res)
    }

    private insertRecipeIngredient(req: Request, res: Response) {
        return insertRecipeIngredientHandler(req, res)
    }

    private publishRecipe(req: Request, res: Response) {
        return publishRecipe(req, res)
    }
    private unpublishRecipe(req: Request, res: Response) {
        return unpublishRecipe(req, res)
    }

    private updateRecipe(req: Request, res: Response) {
        return
    }

    private removeRecipe(req: Request, res: Response) {
        return deleteRecipeQuery(req, res)
    }

    private removeRecipeIngredient(req: Request, res: Response) {
        return
    }
}

const createRecipeRouter: Router = new RecipeRouter().router
export default createRecipeRouter
