import { Request, Response, Router } from 'express'
import {
    addIngredientQuery,
    addRecipeIngredientQuery,
    addRecipeQuery,
    deleteRecipeQuery,
    selectAllRecipesQuery,
    selectIngredientQuery,
    selectRecipeQuery,
    updateRecipeQuery,
} from '../shared/utils/queries'
import {
    deleteQuery,
    getQuery,
    postQuery,
    updateQuery,
} from '../shared/utils/crudCommands'

class RecipeRouter {
    public readonly router: Router
    private readonly deleteRoute: string = '/delete'
    constructor() {
        this.router = Router()
        this.router.get('/', [this.getAllRecipesData])
        this.router.get('/recipe/:id', (_req: Request, res: Response) =>
            this.getRecipeById(_req, res)
        )
        this.router.get('/ingredients/:id', (_req: Request, res: Response) =>
            this.getIngredientById(_req, res)
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
    }

    private getAllRecipesData(req: Request, res: Response) {
        return getQuery(req, res, selectAllRecipesQuery)
    }

    private getRecipeById(req: Request, res: Response) {
        return getQuery(req, res, selectRecipeQuery(req.params.id))
    }

    private getIngredientById(req: Request, res: Response) {
        return getQuery(req, res, selectIngredientQuery(req.params.id))
    }

    private addRecipe(req: Request, res: Response) {
        return postQuery(req, res, addRecipeQuery(req, res))
    }

    private addIngredient(req: Request, res: Response) {
        return postQuery(req, res, addIngredientQuery(req, res))
    }

    private addRecipeIngredient(req: Request, res: Response) {
        return postQuery(req, res, addRecipeIngredientQuery(req, res))
    }

    private updateRecipe(req: Request, res: Response) {
        return updateQuery(req, res, updateRecipeQuery(req, res))
    }

    private removeRecipe(req: Request, res: Response) {
        return deleteQuery(req, res, deleteRecipeQuery(req.params.id))
    }
}

const createRecipeRouter: Router = new RecipeRouter().router
export { createRecipeRouter }
