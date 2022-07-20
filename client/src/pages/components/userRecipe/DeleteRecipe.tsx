import { Button, Grid, Row, Text } from '@nextui-org/react'

import { Recipe } from '../../../../../server/src/shared/types'

interface Props {
    recipe: Recipe
    handleDeleteRecipe: (recipe: Recipe) => void
}

export const DeleteRecipe = ({ recipe, handleDeleteRecipe }: Props) => {
    return (
        <Grid.Container
            css={{
                borderRadius: '14px',
                padding: '0.75rem',
                maxWidth: '350px',
            }}
        >
            <Row justify="center" align="center">
                <Text b>Confirmer</Text>
            </Row>
            <Row>
                {recipe.published ? (
                    <Text>
                        Voulez-vous vraiment supprimer cette recette ? Elle sera
                        dépubliée.
                    </Text>
                ) : (
                    <Text>
                        Voulez-vous vraiment supprimer cette recette ? Vous ne
                        pourrez plus la consulter.
                    </Text>
                )}
            </Row>
            <Grid.Container gap={2} justify="center" alignContent="center">
                <Grid>
                    <Button
                        onPress={() => handleDeleteRecipe(recipe)}
                        size="sm"
                        auto
                        color="error"
                    >
                        Confirmé la suppression
                    </Button>
                </Grid>
            </Grid.Container>
        </Grid.Container>
    )
}

export default DeleteRecipe
