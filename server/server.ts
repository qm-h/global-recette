import { connection } from './config/connectDatabase'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { createRecipeRouter } from './routes/recipesRouter'
import express from 'express'
import path from 'path'

const port = process.env.PORT || 3001
const url = `http://localhost:${port}/`
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/*', createRecipeRouter)

if (process.env.NODE_ENV === 'production') {
    console.log('Production mode')
    app.use(express.static(path.join(__dirname, 'client')))
}

connection.connect((err) => {
    if (err) {
        console.log('erreur', err)
    } else {
        console.log(`Connecté à la base de données MySQL!💾`)
    }
})
app.listen(port, () => {
    console.log(`Server app listening on port ${port} ✅`)
    console.log(`Go to with ${url} 🚀`)
})
module.exports = app
