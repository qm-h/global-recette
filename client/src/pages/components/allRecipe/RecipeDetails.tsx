import { Grid, Text } from '@nextui-org/react'

import ImageRecipe from './ImageRecipe'
import { Recipe } from '../../../../../server/src/shared/types'

interface Props {
    recipe: Recipe
}

const RecipeDetails = ({ recipe }: Props) => {
    return (
        <Grid.Container gap={2}>
            <Grid md={12}>
                <ImageRecipe image={recipe.image_path} />
            </Grid>
            <Grid md={12}>
                <Text size={18}>
                    {' '}
                    Cette recette vient de <b>{recipe.origin}</b>
                </Text>
            </Grid>
            <Grid md={12}>
                <Text size={18}>
                    Les notes prise de la part de {recipe.creator_username} de
                    concernant la recettes sont :
                </Text>
            </Grid>
            <Grid md={12}>
                <Text>{recipe.note}</Text>
            </Grid>
        </Grid.Container>
    )
}

export default RecipeDetails
