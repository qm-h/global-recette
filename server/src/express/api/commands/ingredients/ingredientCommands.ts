import { Request, Response } from 'express'

import { Ingredients } from '../../../../shared/types'
import supabase from '../../../../supabase/supabase'

export const getIngredientsForRecipeHandler = async (
    req: Request,
    res: Response
) => {
    const { ingredients } = req.body
    const newIngredientsList = []
    ingredients.forEach(async (ingredient) =>
        newIngredientsList.push(ingredient.name)
    )
    const result = await supabase
        .from<Ingredients>('ingredients')
        .select()
        .filter('name', 'in', `(${newIngredientsList})`)

    result.status === 200
        ? res.status(200).send(result.data)
        : res
              .status(500)
              .send({ status: 500, message: 'Erreur lors de la récupération' })
}
