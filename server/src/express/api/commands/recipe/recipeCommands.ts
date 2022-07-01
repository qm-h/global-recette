import { Request, Response } from 'express'

import { DataTableType } from '../../../../shared/utils/dataTable'
import { supabase } from './../../../../database/supabase'

export const createRecipe = async (req: Request, res: Response) => {
    const { name, origin, note, user_id, created_at } = req.body
    const result = await supabase.from('recipes').insert([
        {
            name: name,
            origin: origin,
            note: note,
            user_id: user_id,
            created_at: created_at,
        },
    ])
    if (result.status === 400) {
        console.log('error', result.error)
    }
    result.status === 201 ? res.sendStatus(200) : res.sendStatus(500)
}

export const addRecipeIngredientQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    console.log(responseQuery)
    const query = `INSERT INTO ${DataTableType.RECIPE_INGREDIENT_CONNECTION} (idIngredient,idRecette) VALUES ('${responseQuery.idIngredient}','${responseQuery.idRecette}')`
    return query
}

export const publishRecipe = async (req: Request, res: Response) => {
    const { id } = req.body
    const result = await supabase
        .from('recipes')
        .update({ published: true })
        .eq('id', id)
    result.status === 200 ? res.sendStatus(200) : res.sendStatus(500)
}

export const unpublishRecipe = async (req: Request, res: Response) => {
    const { id } = req.body
    const result = await supabase
        .from('recipes')
        .update({ published: false })
        .eq('id', id)
    result.status === 200 ? res.sendStatus(200) : res.sendStatus(500)
}

export const updateRecipeQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    const query = `UPDATE ${DataTableType.RECIPE} SET nomRecette = '${responseQuery.nomRecette}',description = '${responseQuery.description}' WHERE idRecette = ${responseQuery.idRecette}`
    return query
}

export const deleteRecipeQuery = async (req: Request, res: Response) => {
    const { id } = req.params
    const result = await supabase
        .from('recipe_ingredient')
        .delete()
        .eq('recipe_id', id)
    const removeRecipeResult = await supabase
        .from('recipes')
        .delete()
        .eq('id', id)

    if (result.status === 400) {
        console.log('error', result.error)
    }
    if (removeRecipeResult.status === 409) {
        console.log('error', result.error)
    }

    return removeRecipeResult.status === 200
        ? res.sendStatus(200)
        : res.sendStatus(500)
}

export const deleteRecipeIngredientQuery = (id: string) =>
    `DELETE FROM ${DataTableType.RECIPE_INGREDIENT_CONNECTION} where idIngredient = ${id}`
