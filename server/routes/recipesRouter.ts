import express from 'express'
import { mockIngredients, mockRecipes } from '../share/mockRecipes'
const router = express.Router()

router.get('/', (_req, res) => {
    res.json(mockRecipes)
})

router.get('/ingredients/:id', (_req, res) => {
    res.send('OK')
})

router.post('/addRecipes', (req, res) => {
    mockRecipes.push(req.body)
    console.log(mockRecipes)
    res.send('OK')
})

router.post('/addRecipesIngredients', (req, res) => {
    mockIngredients.push(req.body)
    console.log(mockIngredients)
    res.send('OK')
})

export default router
