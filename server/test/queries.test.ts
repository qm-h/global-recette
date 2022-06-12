import { DataTableType, dataTable } from '../shared/dataTable'
import {
    deleteIngredientQuery,
    deleteRecipeIngredientQuery,
    deleteRecipeQuery,
    selectAllRecipesQuery,
} from '../shared/utils/queries'

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
