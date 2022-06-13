import ListRecipes from './pages/ListRecipes'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import RecipeDetails from './pages/components/RecipeDetails'
import '../styles/ListRecipes.scss';

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<ListRecipes />} />
            <Route path="detail/:id" element={<RecipeDetails />} />
        </Routes>
    </>
)

export default App
