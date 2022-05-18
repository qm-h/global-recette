export type Recipes = {
    id: number
    nomRecette: string
    origin: string
    ingredients: Ingredients[]
    description: string
}

export type Ingredients = {
    id: number
    nomIngredient: string
}

export type User = {
    id: number
    nom: string
    prenom: string
    email: string
    password: string
}
