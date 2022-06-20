import { DataTableType, dataTable } from '../../../../shared/utils/dataTable'
import { Request, Response } from 'express'

export const addRecipeQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    const query = `INSERT INTO ${dataTable(
        DataTableType.RECIPE
    )} (name, origine, note, user_id) VALUES ('${responseQuery.name}','${
        responseQuery.origine
    }','${responseQuery.note}', '${responseQuery.user_id}')`
    return query
}

export const addIngredientQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    const query = `INSERT INTO ${dataTable(
        DataTableType.INGREDIENTS
    )} (nomIngredient) VALUES ('${responseQuery.nomIngredient}')`
    return query
}

export const addRecipeIngredientQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    console.log(responseQuery)
    const query = `INSERT INTO ${DataTableType.RECIPE_INGREDIENT_CONNECTION} (idIngredient,idRecette) VALUES ('${responseQuery.idIngredient}','${responseQuery.idRecette}')`
    return query
}

export const updateRecipeQuery = (req: Request, _res: Response) => {
    const responseQuery = req.body
    const query = `UPDATE ${DataTableType.RECIPE} SET nomRecette = '${responseQuery.nomRecette}',description = '${responseQuery.description}' WHERE idRecette = ${responseQuery.idRecette}`
    return query
}

export const deleteRecipeQuery = (id: string) =>
    `DELETE r.*, fr.* 
        FROM ${DataTableType.RECIPE}  r 
        LEFT JOIN ${DataTableType.RECIPE_INGREDIENT_CONNECTION}  fr 
        ON r.idRecette = fr.idRecette 
        WHERE r.idRecette = ${id}`

export const deleteRecipeIngredientQuery = (id: string) =>
    `DELETE FROM ${DataTableType.RECIPE_INGREDIENT_CONNECTION} where idIngredient = ${id}`

export const deleteIngredientQuery = (id: string) =>
    `DELETE FROM ${DataTableType.INGREDIENTS} where idIngredient = ${id}`
