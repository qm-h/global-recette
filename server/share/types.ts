export type Recipes = {
    id: number
    name: string
    origin: string
    ingredients: Ingredients[]
    details: string
}

export type Ingredients = {
    recipeId: number
    name: string
}
