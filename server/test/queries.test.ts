import { DataTableType, dataTable } from '../src/shared/utils/dataTable'
import {
    deleteIngredientQuery,
    deleteRecipeIngredientQuery,
    deleteRecipeQuery,
    selectAllRecipesQuery,
} from '../src/express/api/queries/recipe/recipeCrudQueries'

test('delete recipe with good id', async () => {
    const id = '1'
    expect(deleteRecipeQuery(id)).toContain(`WHERE r.idRecette = ${id}`)
})

test('get AllRecipe query', async () => {
    expect(selectAllRecipesQuery).toContain(
        `FROM ${dataTable(DataTableType.RECETTE)}`
    )
})

test('delete ingredient query', async () => {
    const id = '1'
    expect(deleteIngredientQuery(id)).toContain(
        `DELETE FROM ${DataTableType.INGREDIENTS} where idIngredient = ${id}`
    )
    expect(deleteRecipeIngredientQuery(id)).toContain(
        `DELETE FROM ${DataTableType.FULL_RECETTE} where idIngredient = ${id}`
    )
})
