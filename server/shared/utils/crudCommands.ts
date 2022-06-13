import { Request, Response } from 'express'

import { MysqlError } from 'mysql'
import { Recipe } from '../types'
import { connection } from '../../config/connectDatabase'

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

export const updateQuery = (_req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, response: Response) => {
        if (err) throw err
        res.send(response)
    })

export const deleteQuery = (_req: Request, res: Response, sqlQuery: string) =>
    connection.query(sqlQuery, (err: MysqlError, response: Response) => {
        if (err) throw err
        res.send(response)
    })
