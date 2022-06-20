import express, { NextFunction, Request, Response } from 'express'

import authService from './services/authService'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import createAuthRouter from './express/routes/authRouter'
import createRecipeRouter from './express/routes/recipesRouter'
import dotenv from 'dotenv'
import path from 'path'
import { supabase } from './database/supabase'

dotenv.config()
const port = process.env.PORT || 3001
const portProd = 8080
const url = `http://localhost:${port}/`
const urlProd = `http://localhost:${portProd}/`
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/recipe', createRecipeRouter)
app.use('/api/auth', createAuthRouter)

supabase.auth
    .signIn({
        provider: 'github',
    })
    .then(() => {
        console.log('Connecté à la base de données Supabase!💾')
    })
    .catch((err) => {
        console.log('erreur', err)
    })

if (process.env.NODE_ENV === 'prod') {
    console.log('Production mode')
    app.use(express.static(path.join(__dirname, 'client')))
    app.listen(portProd, () => {
        console.log(`Server app listening on port ${portProd} ✅`)
        console.log(`Server is on production mode on ${urlProd} 🚀`)
    })
} else {
    console.log('Development mode')

    app.listen(port, () => {
        console.log(`Server listening on port ${port} ✅`)
        console.log(`Server is on development mode on ${url} 🚀`)
    })
}

module.exports = app
