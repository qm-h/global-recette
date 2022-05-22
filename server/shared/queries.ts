import { Request, Response } from 'express'
import { MysqlError } from 'mysql'
import { connection } from '../config/connectDatabase'
import { Recipes } from './types'
import { dataTable, DataTableType } from './dataTable'

export const getQuery = (req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipes[]) => {
        if (err) throw err
        res.send(results)
    })

export const getQueryOne = (req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipes) => {
        if (err) throw err
        res.send(results)
    })

export const postQuery = (req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipes[]) => {
        if (err) throw err
        res.send(results)
    })

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
