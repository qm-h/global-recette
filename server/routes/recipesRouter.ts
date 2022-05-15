import express from 'express'
import { mockRecipes } from '../share/mockRecipes'
const router = express.Router()

router.get('/', (req, res) => {
    res.json(mockRecipes)
})

router.post('/addRecipes', (req, res) => {
    mockRecipes.push(req.body)
    console.log(mockRecipes)
    res.send('OK')
})

export default router
