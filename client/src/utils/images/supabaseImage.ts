import { getRecipeImage } from '../../router/recipesRouter'

const getSupabaseRecipeUrlImages = async (imageName: string) => {
    const imageUrl = await getRecipeImage(imageName).then((res) => res.url)
    return imageUrl
}

export { getSupabaseRecipeUrlImages }
