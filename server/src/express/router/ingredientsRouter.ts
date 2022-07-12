import { Request, Response } from 'express'
import {
    createIngredientHandler,
    getIngredientsForRecipeHandler as getIngredientByName,
} from '../api/commands/ingredients/ingredientCommands'
import {
    getAllIngredientsByRecipeIDHandler,
    getAllIngredientsHandler,
    getIngredientByIDHandler,
} from '../api/queries/ingredients/ingredientQueries'

import { Router } from 'express'

class IngredientsRouter {
    public router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', this.getAllIngredients)
        this.router.get('/recipe/:recipeID', this.getAllIngredientsByRecipeID)
        this.router.get('/:id', this.getIngredientById)
        this.router.post('/ingredientbyname', this.getIngredientByName)
        this.router.post('/create', this.createIngredient)
        this.router.put('/update', this.updateIngredient)
        this.router.delete('/delete/:id', this.removeIngredient)
    }

    private getAllIngredients(req: Request, res: Response) {
        return getAllIngredientsHandler(req, res)
    }

    private getAllIngredientsByRecipeID(req: Request, res: Response) {
        return getAllIngredientsByRecipeIDHandler(req, res)
    }

    private getIngredientById(req: Request, res: Response) {
        return getIngredientByIDHandler(req, res)
    }

    private createIngredient(req: Request, res: Response) {
        return createIngredientHandler(req, res)
    }

    private getIngredientByName(req: Request, res: Response) {
        return getIngredientByName(req, res)
    }

    private updateIngredient(req: Request, res: Response) {
        return res.send('updateIngredient')
    }

    private removeIngredient(req: Request, res: Response) {
        return res.send('removeIngredient')
    }
}

const createIngredientsRouter: Router = new IngredientsRouter().router
export default createIngredientsRouter
