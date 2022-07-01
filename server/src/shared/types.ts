export type Recipe = {
    id?: number
    name: string
    origin: string
    note: string
    user_id: number
    favorite_id?: number
    favorite_number?: number
    created_at: EpochTimeStamp
    updated_at?: string
    published?: boolean
    user?: User
}

export type Ingredients = {
    id?: number
    name: string
}

export type RecipeIngredient = {
    id?: number
    recipe_id: number
    ingredient_id: number
    quantity: string
}

export type User = {
    id: number
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    avatar: string
}

export type TokenUserAccess = {
    token_user_access: string
    user_id: number
    created_at: EpochTimeStamp
}

export type AuthUser = Pick<User, 'email' | 'password'>
export type AuthResponse = {
    user: Omit<User, 'password'>
    accessUUID: string
}

export type AuthRequest = Omit<User, 'id'>
export type SuccessAuthUser = Omit<User, 'password'>
