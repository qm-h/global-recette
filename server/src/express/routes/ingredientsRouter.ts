import { Request, Response } from 'express'
import {
    getAllIngredients,
    getAllIngredientsByRecipeID,
    getIngredientByID,
} from '../api/queries/ingredients/ingredientQueries'

import { Router } from 'express'
import { getIngredientsForRecipe as getIngredientByName } from '../api/commands/ingredients/ingredientCommands'

class IngredientsRouter {
    public router: Router

    constructor() {
        this.router = Router()
        this.router.get('/', this.getAllIngredients)
        this.router.get('/recipe/:recipeID', this.getAllIngredientsByRecipeID)
        this.router.get('/:id', this.getIngredientById)
        this.router.post('/add', this.createIngredient)
        this.router.post('/ingredientbyname', this.getIngredientByName)
        this.router.put('/update', this.updateIngredient)
        this.router.delete('/delete/:id', this.removeIngredient)
    }

    private getAllIngredients(req: Request, res: Response) {
        return getAllIngredients(req, res)
    }

    private getAllIngredientsByRecipeID(req: Request, res: Response) {
        return getAllIngredientsByRecipeID(req, res)
    }

    private getIngredientById(req: Request, res: Response) {
        return getIngredientByID(req, res)
    }

    private createIngredient(req: Request, res: Response) {
        return
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
