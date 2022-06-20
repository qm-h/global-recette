export type Recipe = {
    id: number
    name: string
    origine: string
    note: string
    user_id: number
    favorite_id: number
    favorite_number: number
    created_at: string
    updated_at: string
    user: User
}

export type Ingredients = {
    id: number
    name: string
    quantity: string
}

export type User = {
    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
}

export type AuthUser = Pick<User, 'email' | 'password'>

export type FullRecette = {
    idIngredient: number
    idRecette: number
}

export type AuthResponse = User
export type AuthRequest = Omit<User, 'id'>
