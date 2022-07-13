import { Grid, Card, Text } from '@nextui-org/react'
import { AiFillHeart } from 'react-icons/ai'
import { Recipe } from '../../../../../server/src/shared/types'

interface UserRecipesListProps {
    recipes: Recipe[]
}

const UserRecipesList = ({ recipes }: UserRecipesListProps) => (
    <>
        {recipes.map((r, i) => (
            <Grid
                key={i}
                md={4}
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <Card>
                    <Card.Header>
                        <Grid
                            md={9}
                            css={{
                                pr: '$1',
                                pl: '$1',
                                pt: '$0',
                                pb: '$0',
                            }}
                            justify="space-between"
                        >
                            <Text h3>{r.name}</Text>
                        </Grid>
                        <Grid md={3}>
                            {r.favorites_number}{' '}
                            <AiFillHeart
                                style={{ margin: '.25rem' }}
                                color="#ff2222"
                            />
                        </Grid>
                    </Card.Header>
                    <Card.Body>
                        <Grid
                            md={12}
                            css={{
                                pl: '$1',
                                pr: '$1',
                                pb: '$0',
                                pt: '$0',
                            }}
                            justify="space-between"
                        >
                            <Text
                                onClick={() => console.log('')}
                                color="primary"
                            >
                                Voir la recette
                            </Text>
                        </Grid>
                    </Card.Body>
                </Card>
            </Grid>
        ))}
    </>
)

export default UserRecipesList
