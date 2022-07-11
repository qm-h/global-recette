import Logger from './shared/utils/logger'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import createAuthRouter from './express/router/authRouter'
import createIngredientsRouter from './express/router/ingredientsRouter'
import createRecipeRouter from './express/router/recipesRouter'
import createUserRouter from './express/router/userRouter'
import dotenv from 'dotenv'
import express from 'express'
import fileUpload from 'express-fileupload'
import path from 'path'
import supabase from './supabase/supabase'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })
export const logger = new Logger()
const port = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(fileUpload())
app.use(express.static(path.join('public')))

app.use('/api/recipe', createRecipeRouter)
app.use('/api/auth', createAuthRouter)
app.use('/api/ingredients', createIngredientsRouter)
app.use('/api/user', createUserRouter)

supabase.auth
    .signIn({
        provider: 'github',
    })
    .then(() => {
        logger.info('Connecté à la base de données Supabase!💾')
    })
    .catch((err) => {
        logger.error(`ERROR: ${err}`)
    })

if (process.env.NODE_ENV === 'production') {
    logger.info(`Production mode.`)
    app.use(express.static(path.join(__dirname, '..', 'client')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'index.html'))
    })
    app.listen(port)
} else {
    logger.debug(`Development mode.`)
    app.listen(port, () => {
        logger.debug(`Server listening on port ${port}`)
        logger.warning(`Press CTRL + C to stop server 🛑`)
    })
}

module.exports = app
