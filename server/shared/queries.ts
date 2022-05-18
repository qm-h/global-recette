import { Request, Response } from 'express'
import { MysqlError } from 'mysql'
import { connection } from '../config/connectDatabase'
import { Recipes } from './types'

export const getQuery = (req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipes[]) => {
        if (err) throw err
        res.send(results)
    })
export const postQuery = (req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipes[]) => {
        if (err) throw err
        res.send(results)
    })

export const selectAllRecipesQuery =
    'SELECT nomRecette, origine, description FROM recette'
export const selectRecipeQuery = (id: string) =>
    `SELECT * FROM recette WHERE idRecette=${id}`
export const selectIngredientQuery = (id: string) =>
    `SELECT * FROM ingredients WHERE idIngredient=${id}`

export const addRecipeQuery = (req: Request, _res: Response) => {
    const responseQuery = req.query
    const query = `INSERT INTO recette (nomRecette, origine, description) VALUES ('${responseQuery.nomRecette}','${responseQuery.origine}','${responseQuery.description}')`
    return query
}
