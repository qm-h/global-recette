import './App.css'
import './styles/ListRecipes.scss';

import { Route, Routes } from 'react-router-dom'

import ListRecipes from './pages/ListRecipes'
import RecipeDetails from './pages/components/RecipeDetails'

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<ListRecipes />} />
            <Route path="detail/:id" element={<RecipeDetails/>} />
        </Routes>
    </>
)

export default App
