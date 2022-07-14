export type Recipe = {
    id?: number
    name: string
    origin: string
    note: string
    created_by: number
    creator_username: string
    image_path?: string
    favorite_id?: number
    favorites_number?: number
    created_at: EpochTimeStamp
    updated_at?: string
    published?: boolean
    user?: SuccessAuthUser
}

export type Ingredients = {
    id?: number
    name: string
}

export type ImageUUIDBridge = {
    id?: number
    image_path: string
    image_uuid: string
    created_at?: EpochTimeStamp
}

export type HasSavedRecipe = {
    favorite: boolean
    recipeID: number
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
    access_jwt_token: string
    avatar?: string
    generated_avatar: string
    followers?: number
    following?: number
    biography?: string
    confirmed?: boolean
}

export type Followers = {
    id: number
    follower_username: string
    user_to_follow: number
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

export type ExpressResponseDataType = {
    status: number
    data: any
}

export type ExpressResponseUrlType = {
    status: number
    url: string
}

export type FavoritesRecipe = {
    id?: number
    recipe_id: number
    user_id: number
}

export type FavoritesRecipesResponse = FavoritesRecipe & {
    recipes: Recipe
}

export type AuthResponse = {
    status: number
    message: string
    user?: Omit<User, 'password'>
    accessUUID?: string
}
export type ResetPasswordRequest = {
    password: string
    token: string
}

export type FavoritesRecipeWithUser = {
    favorites: Recipe[]
    users: RecipeUser[]
}

export type UserRecipesResponse = {
    status: number
    message: string
    recipes: Recipe[]
}

export type AuthUser = Pick<User, 'email' | 'password'>
export type UserToken = Pick<
    User,
    'email' | 'username' | 'firstname' | 'lastname'
>
export type UserRegister = Pick<
    User,
    | 'username'
    | 'password'
    | 'email'
    | 'firstname'
    | 'lastname'
    | 'generated_avatar'
>

export type AuthRequest = Omit<User, 'id' | 'access_jwt_token'>
export type SuccessAuthUser = Omit<User, 'password'>
export type RecipeUser = Pick<User, 'id' | 'username' | 'avatar'>
export type ForgotUserPassword = Pick<User, 'id' | 'email'>
