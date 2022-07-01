import { Request, Response } from 'express'

import { supabase } from '../../../../database/supabase'

export const getIngredientsForRecipe = async (req: Request, res: Response) => {
    const { ingredients } = req.body
    const newIngredientsList = []
    ingredients.forEach(async (ingredient) =>
        newIngredientsList.push(ingredient.name)
    )
    const result = await supabase
        .from('ingredients')
        .select()
        .filter('name', 'in', `(${newIngredientsList})`)

    result.status === 200
        ? res.status(200).send(result.data)
        : res.sendStatus(500)
}
