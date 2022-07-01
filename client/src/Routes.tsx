import { Route, Routes } from 'react-router-dom'

import ListRecipes from './pages/ListRecipes'
import LoginPage from './pages/AuthPage'
import UserRecipePage from './pages/UserRecipePage'

const CustomsRoutes = () => (
    <Routes>
        <Route path="/" element={<ListRecipes />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mesrecettes" element={<UserRecipePage />} />
    </Routes>
)

export default CustomsRoutes
