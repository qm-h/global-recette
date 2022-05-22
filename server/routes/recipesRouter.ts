import { Router, Request, Response } from 'express'
import {
    selectAllRecipesQuery,
    selectIngredientQuery,
    selectRecipeQuery,
    getQuery,
    addRecipeQuery,
    postQuery,
    getQueryOne,
} from '../shared/queries'

class RecipeRouter {
    public readonly router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', [this.getAllRecipesData])
        this.router.get('/recipe/:id', (_req: Request, res: Response) => [
            this.getRecipeById(_req, res),
        ])
        this.router.get('/ingredients/:id', (_req: Request, res: Response) => [
            this.getIngredientById(_req, res),
        ])
        this.router.post('/addrecipe', (_req: Request, res: Response) => [
            this.addRecipe(_req, res),
        ])
    }

    private getAllRecipesData(req: Request, res: Response) {
        return getQuery(req, res, selectAllRecipesQuery)
    }

    private getRecipeById(req: Request, res: Response) {
        return getQueryOne(req, res, selectRecipeQuery(req.params.id))
    }

    private getIngredientById(req: Request, res: Response) {
        return getQuery(req, res, selectIngredientQuery(req.params.id))
    }

    private addRecipe(req: Request, res: Response) {
        return postQuery(req, res, addRecipeQuery(req, res))
    }
}

const createRecipeRouter: Router = new RecipeRouter().router
export { createRecipeRouter }
