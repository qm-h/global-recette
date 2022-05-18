import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createRecipeRouter } from './routes/recipesRouter'
import { connection } from './config/connectDatabase'

const port = process.env.PORT || 3001
const url = `http://localhost:${port}/`
const databaseUrl =
    'http://localhost/phpmyadmin/index.php?route=/database/structure&server=1&db=id18905711_restomiam'
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', createRecipeRouter)

connection.connect((err) => {
    if (err) {
        console.log('erreur', err)
    } else {
        console.log(
            `Connecté à la base de données MySQL! c'est ici ▶︎${databaseUrl} 💾`
        )
    }
})
app.listen(port, () => {
    console.log(`Server app listening on port ${port} ✅`)
    console.log(`Go to with ${url} 🚀`)
})
module.exports = app
