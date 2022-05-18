import mysql from 'mysql'
export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'id18905711_restomiam',
})
