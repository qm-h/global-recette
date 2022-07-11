import { Grid, Image, Loading } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { getSupabaseRecipeUrlImages } from '../../../utils/images/supabaseImage'

const ImageRecipe = ({ image }) => {
    const [urlImage, setUrlImage] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        Promise.all([getSupabaseRecipeUrlImages(image)]).then(([image]) => {
            setUrlImage(image)
            setIsLoading(false)
        })
    }, [image])

    return (
        <>
            {isLoading ? (
                <Grid.Container gap={2}>
                    <Grid md={12} justify="center">
                        <Loading
                            color="primary"
                            type="points-opacity"
                            size="xl"
                        />
                    </Grid>
                </Grid.Container>
            ) : (
                <Image
                    showSkeleton
                    width={500}
                    height={280}
                    maxDelay={1000}
                    autoResize
                    src={urlImage}
                    alt="Image de Recette"
                />
            )}
        </>
    )
}

export default ImageRecipe
