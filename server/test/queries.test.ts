import { deleteRecipeQuery } from '../shared/utils/queries'

test('delete recipe with good id', async () => {
    const id = '1'

    expect(deleteRecipeQuery(id)).toContain(`WHERE r.idRecette = ${id}`)
})
