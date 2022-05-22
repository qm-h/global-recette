export type Recipe = {
    idRecette: number
    nomRecette: string
    origine: string
    description: string
}

export type Ingredients = {
    idIngredient: number
    nomIngredient: string
}

export type User = {
    id: number
    nom: string
    prenom: string
    email: string
    password: string
}

export type FullRecette = {
    idIngredient: number
    idRecette: number
}
