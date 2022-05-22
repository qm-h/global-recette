import { MysqlError } from 'mysql'
import { connection } from '../../config/connectDatabase'
import { Recipe } from '../types'
import { Request, Response } from 'express'

export const getQuery = (_req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipe[]) => {
        if (err) throw err
        res.send(results)
    })

export const postQuery = (_req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, results: Recipe[]) => {
        if (err) throw err
        res.send(results)
    })

export const deleteQuery = (_req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, response: Response) => {
        if (err) throw err
        res.send(response)
    })
