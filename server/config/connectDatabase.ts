import mysql from 'mysql2'
export const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'id18905711_restomiam',
    port: 3306,
})

// export const connection = mysql.createConnection({
//     host: 'mysql_db',
//     user: 'root',
//     password: 'admin',
//     database: 'id18905711_restomiam',
//     port: 3306,
// })
