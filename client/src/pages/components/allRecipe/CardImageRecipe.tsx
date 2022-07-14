import { useEffect, useState } from 'react'

import { Card } from '@nextui-org/react'
import { Recipe } from '../../../../../server/src/shared/types'
import { getSupabaseRecipeUrlImages } from '../../../utils/images/supabaseImage'

interface Props {
    recipe: Recipe
}

const CardImageRecipe = ({ recipe }: Props) => {
    const [urlImage, setUrlImage] = useState('')

    useEffect(() => {
        if (recipe.image_path) {
            Promise.all([getSupabaseRecipeUrlImages(recipe.image_path)]).then(
                ([image]) => {
                    setUrlImage(image)
                }
            )
        }
    }, [recipe.image_path])

    return (
        <Card.Image
            src={urlImage}
            objectFit="cover"
            showSkeleton
            autoResize
            maxDelay={2000}
            width="100%"
            height={200}
        />
    )
}

export default CardImageRecipe
