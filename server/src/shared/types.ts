export type Recipe = {
    id?: number
    name: string
    origin: string
    note: string
    created_by: number
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
    confirmed?: boolean
}

export type UserResetPassword = {
    id?: number
    user_id: number
    token: string
    created_at: EpochTimeStamp
}

export type TokenUserAccess = {
    token_user_access: string
    user_id: number
    created_at: EpochTimeStamp
}

export type MailerOptions = {
    from: string
    to: string
    subject: string
    text: string
    html: string // html body
}

export type UserConfirmation = {
    id?: number
    email: string
    token: string
    created_at: EpochTimeStamp
}

export type ExpressResponseMessageType = {
    status: number
    message: string
}

export type FavoritesRecipe = {
    id?: number
    recipe_id: number
    user_id: number
}

export type FavoritesRecipesResponse = FavoritesRecipe & {
    recipes: Recipe
}

export type AuthUser = Pick<User, 'email' | 'password'>
export type AuthResponse = {
    user?: Omit<User, 'password'>
    accessUUID?: string
    status: number
}

export type AuthRequest = Omit<User, 'id'>
export type SuccessAuthUser = Omit<User, 'password'>
export type ResetPasswordRequest = {
    password: string
    token: string
}

export type RecipeUser = Pick<User, 'id' | 'username' | 'avatar'>

export type FavoritesRecipeWithUser = {
    favorites: Recipe[]
    users: RecipeUser[]
}
