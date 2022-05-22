export type Recipes = {
    idRecette: number
    nomRecette: string
    origine: string
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
