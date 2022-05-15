import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import recipesRouter from './routes/recipesRouter'

const port = process.env.PORT || 3001
const url = `http://localhost:${port}/`

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', recipesRouter)

app.listen(port, () => {
    console.log('Server app listening on port', port, '✅')
    console.log('Go to with', url, '🚀')
})
module.exports = app
