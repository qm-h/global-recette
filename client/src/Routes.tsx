import { Route, Routes } from 'react-router-dom'

import Confirmation from './pages/components/auth/confirmationRegister/Confirmation'
import { Container } from '@nextui-org/react'
import ListRecipes from './pages/ListRecipes'
import LoginPage from './pages/AuthPage'
import ResetPassword from './pages/components/auth/resetPassword/ResetPassword'
import UserFavoritesPage from './pages/UserFavoritesPage'
import UserRecipePage from './pages/UserRecipePage'

const CustomsRoutes = () => (
    <Container
        css={{
            h: '100vh',
            w: '90%',
        }}
        display="flex"
        justify="center"
        alignItems="center"
        responsive
    >
        <Routes>
            <Route path="/" element={<ListRecipes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mes-recettes" element={<UserRecipePage />} />
            <Route path="/mes-favoris" element={<UserFavoritesPage />} />
            <Route path="/confirmation/:token" element={<Confirmation />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
    </Container>
)

export default CustomsRoutes
