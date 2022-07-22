import { getRecipeImage } from '../../router/recipesRouter'
import { getUserCoverImage } from '../../router/userRouter'

const getSupabaseRecipeUrlImages = async (imageName: string) => {
    const imageUrl = await getRecipeImage(imageName).then((res) => res.url)
    return imageUrl
}

const getSupabaseUserUrlCoverImage = async (userID: number) => {
    const imageUrl = await getUserCoverImage(userID).then((res) => res)
    return imageUrl
}

export { getSupabaseRecipeUrlImages, getSupabaseUserUrlCoverImage }
