import { Request, Response, Router } from 'express'
import {
    getAllIngredientsQuery,
    getAllRecipesByUserIdQuery,
    getAllRecipesQuery,
    getAllRecipesWithUserQuery,
    getIngredientByIdQuery,
    getRecipeByIdQuery,
} from './../api/queries/recipe/recipeCrudQueries'

class RecipeRouter {
    public readonly router: Router
    private readonly deleteRoute: string = '/delete'
    constructor() {
        this.router = Router()
        this.router.get('/', [this.getAllRecipesData])
        this.router.get('/withUser', [this.getAllRecipesWithUser])
        this.router.get('/user/:id', [this.getAllRecipesByUserID])
        this.router.get('/:id', (_req: Request, res: Response) =>
            this.getRecipeById(_req, res)
        )
        this.router.get('/ingredients/:id', (_req: Request, res: Response) =>
            this.getIngredientById(_req, res)
        )
        this.router.get('/ingredients', (_req: Request, res: Response) =>
            this.getAllIngredients(_req, res)
        )
        this.router.post('/addrecipe', (_req: Request, res: Response) =>
            this.addRecipe(_req, res)
        )
        this.router.post('/addingredient', (_req: Request, res: Response) =>
            this.addIngredient(_req, res)
        )
        this.router.post(
            '/addrecipeingredient',
            (_req: Request, res: Response) =>
                this.addRecipeIngredient(_req, res)
        )
        this.router.put('/updaterecipe', (_req: Request, res: Response) =>
            this.updateRecipe(_req, res)
        )
        this.router.delete(
            `${this.deleteRoute}/recipe/:id`,
            (_req: Request, res: Response) => this.removeRecipe(_req, res)
        )
        this.router.delete(
            `${this.deleteRoute}/recipeingredient/:id`,
            (_req: Request, res: Response) =>
                this.removeRecipeIngredient(_req, res)
        )
    }

    private getAllRecipesData(req: Request, res: Response) {
        return getAllRecipesQuery(req, res)
    }

    private async getAllRecipesWithUser(req: Request, res: Response) {
        return getAllRecipesWithUserQuery(req, res)
    }

    private async getAllRecipesByUserID(req: Request, res: Response) {
        return getAllRecipesByUserIdQuery(req, res)
    }

    private getAllIngredients(req: Request, res: Response) {
        return getAllIngredientsQuery(req, res)
    }

    private getRecipeById(req: Request, res: Response) {
        return getRecipeByIdQuery(req, res)
    }

    private getIngredientById(req: Request, res: Response) {
        return getIngredientByIdQuery(req, res)
    }

    private addRecipe(req: Request, res: Response) {
        return
    }

    private addIngredient(req: Request, res: Response) {
        return
    }

    private addRecipeIngredient(req: Request, res: Response) {
        return
    }

    private updateRecipe(req: Request, res: Response) {
        return
    }

    private removeRecipe(req: Request, res: Response) {
        return
    }

    private removeRecipeIngredient(req: Request, res: Response) {
        return
    }
}

const createRecipeRouter: Router = new RecipeRouter().router
export default createRecipeRouter
