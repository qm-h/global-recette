export enum DataTableType {
    RECIPE = 'recipe',
    INGREDIENTS = 'ingredients',
    RECIPE_INGREDIENT_CONNECTION = 'recipe_ingredient_connection',
    USER = 'user',
    FAVORITE_RECIPE = 'favorite_recipe',
}

export const dataTable = (dataTable: DataTableType) => dataTable.toString()
