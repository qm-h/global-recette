import { Request, Response } from 'express'
import { dataTable, DataTableType } from '../dataTable'

export const selectAllRecipesQuery = `SELECT idRecette, nomRecette, origine, description FROM ${dataTable(
    DataTableType.RECETTE
)}`

export const selectRecipeQuery = (id: string) =>
    `SELECT r.nomRecette,r.origine,r.description
    FROM ${dataTable(DataTableType.RECETTE)} r 
    WHERE r.idRecette = ${id}`

export const selectIngredientQuery = (id: string) =>
    `SELECT i.nomIngredient FROM ${dataTable(
        DataTableType.FULL_RECETTE
    )} fr INNER JOIN ${dataTable(
        DataTableType.INGREDIENTS
    )} i ON i.idIngredient = fr.idIngredient
    WHERE fr.idRecette = ${id}`

export const addRecipeQuery = (req: Request, _res: Response) => {
    const responseQuery = req.query
    const query = `INSERT INTO ${dataTable(
        DataTableType.RECETTE
    )} (nomRecette, origine, description) VALUES ('${
        responseQuery.nomRecette
    }','${responseQuery.origine}','${responseQuery.description}')`
    return query
}

export const addIngredientQuery = (req: Request, _res: Response) => {
    const responseQuery = req.query
    const query = `INSERT INTO ${dataTable(
        DataTableType.INGREDIENTS
    )} (nomIngredient) VALUES ('${responseQuery.nomIngredient}')`
    return query
}

export const addRecipeIngredientQuery = (req: Request, _res: Response) => {
    const responseQuery = req.query
    const query = `INSERT INTO ${DataTableType.FULL_RECETTE} (idIngredient,idRecette) VALUES ('${responseQuery.idIngredient}','${responseQuery.idRecette}')`
    return query
}

export const updateRecipeQuery = (req: Request, _res: Response) => {
    const responseQuery = req.query
    const query = `UPDATE ${DataTableType.RECETTE} SET nomRecette = '${responseQuery.nomRecette}',origine = '${responseQuery.origine}',description = '${responseQuery.description}' WHERE idRecette = ${responseQuery.idRecette}`
    return query
}

export const deleteRecipeQuery = (id: string) =>
    `DELETE r.*, fr.* 
    FROM ${DataTableType.RECETTE}  r 
    LEFT JOIN ${DataTableType.FULL_RECETTE}  fr 
    ON r.idRecette = fr.idRecette 
    WHERE r.idRecette = ${id}`

export const deleteRecipeIngredientQuery = (id: string) =>
    `DELETE FROM ${DataTableType.FULL_RECETTE} where idIngredient = ${id}`

export const deleteIngredientQuery = (id: string) =>
    `DELETE FROM ${DataTableType.INGREDIENTS} where idIngredient = ${id}`
