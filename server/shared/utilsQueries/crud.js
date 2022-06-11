'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.deleteQuery = exports.postQuery = exports.getQuery = void 0
const connectDatabase_1 = require('../../config/connectDatabase')
const getQuery = (_req, res, sqlQuery) =>
    connectDatabase_1.connection.query(sqlQuery, (err, results) => {
        if (err) throw err
        res.send(results)
    })
exports.getQuery = getQuery
const postQuery = (_req, res, sqlQuery) =>
    connectDatabase_1.connection.query(sqlQuery, (err, results) => {
        if (err) throw err
        res.send(results)
    })
exports.postQuery = postQuery
const deleteQuery = (_req, res, sqlQuery) =>
    connectDatabase_1.connection.query(sqlQuery, (err, response) => {
        if (err) throw err
        res.send(response)
    })
exports.deleteQuery = deleteQuery
