import { Card, Loading } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { Recipe } from '../../../../../server/src/shared/types'
import { getSupabaseRecipeUrlImages } from '../../../utils/images/supabaseImage'

interface Props {
    recipe: Recipe
}

const CardImageRecipe = ({ recipe }: Props) => {
    const [urlImage, setUrlImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log(recipe.image_path)
        if (recipe.image_path) {
            Promise.all([getSupabaseRecipeUrlImages(recipe.image_path)]).then(
                ([image]) => {
                    setUrlImage(image)
                    setIsLoading(false)
                }
            )
        }
    }, [recipe.image_path])

    return (
        <>
            {isLoading ? (
                <Loading
                    css={{
                        m: '$10',
                    }}
                    size="md"
                    type={'points-opacity'}
                />
            ) : (
                <Card.Image
                    src={urlImage}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    autoResize
                    showSkeleton
                    maxDelay={2000}
                    alt="Relaxing app background"
                />
            )}
        </>
    )
}

export default CardImageRecipe
