import { Route, Routes } from 'react-router-dom'

import Confirmation from './pages/components/auth/confirmationRegister/Confirmation'
import { Container } from '@nextui-org/react'
import ListRecipes from './pages/ListRecipesPage'
import LoginPage from './pages/AuthPage'
import NotFoundPage from './pages/NotFoundPage'
import ResetPassword from './pages/components/auth/resetPassword/ResetPassword'
import UserFavoritesPage from './pages/UserFavoritesPage'
import UserProfilePage from './pages/UserProfilePage'
import UserRecipePage from './pages/UserRecipePage'
import UserSettingsPage from './pages/UserSettingsPage'

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
            <Route caseSensitive path="/" element={<ListRecipes />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/mes-recettes" element={<UserRecipePage />} />
            <Route path="/mes-favoris" element={<UserFavoritesPage />} />
            <Route path="/confirmation/:token" element={<Confirmation />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/profile" element={<UserProfilePage />} />
            <Route path="/settings" element={<UserSettingsPage />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    </Container>
)

export default CustomsRoutes
