import { Request, Response } from 'express'

import { Ingredients } from '../../../../shared/types'
import { logger } from '../../../../server'
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

export const createIngredientHandler = async (req: Request, res: Response) => {
    const { ingredient } = req.body
    const isExist = await supabase
        .from<Ingredients>('ingredients')
        .select()
        .like('name', `%${ingredient}%`)

    if (isExist.data.length > 0) {
        logger.error(`Ingredient ${ingredient} already exist`)
        return res.send({ status: 400, message: 'Ingrédient déjà existant' })
    }

    const result = await supabase.from<Ingredients>('ingredients').insert({
        name: ingredient,
    })

    if (result.status === 400) {
        logger.error(`Error while creating ingredient ${ingredient}`)
        return res.send({ status: 500, message: 'Erreur lors de la création' })
    }

    return res.status(200).send({ status: 200, message: 'Création réussie' })
}
