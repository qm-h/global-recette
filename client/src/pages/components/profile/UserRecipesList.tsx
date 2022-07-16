import { Grid, Card, Text } from '@nextui-org/react'
import { AiFillHeart } from 'react-icons/ai'
import { NavigateFunction } from 'react-router-dom'
import { Recipe } from '../../../../../server/src/shared/types'

interface UserRecipesListProps {
    recipes: Recipe[]
    navigate: NavigateFunction
    isMobile: boolean
    isDark: boolean
}

const UserRecipesList = ({
    recipes,
    navigate,
    isMobile,
    isDark,
}: UserRecipesListProps) => (
    <>
        {recipes.map((r, i) => (
            <Grid
                key={i}
                xs={8}
                md={4}
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <Card variant={'bordered'}>
                    <Card.Header>
                        <Grid
                            xs={6}
                            md={9}
                            css={{
                                pr: '$1',
                                pl: '$1',
                                pt: '$0',
                                pb: '$0',
                            }}
                            justify={'flex-start'}
                        >
                            <Text h3={!isMobile} h5={isMobile}>
                                {r.name}
                            </Text>
                        </Grid>
                        <Grid xs={6} md={3} justify={'flex-end'}>
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
                                onClick={() =>
                                    navigate({
                                        pathname: `/recette/${r.id}`,
                                    })
                                }
                                css={{
                                    color: '$accents6',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease-in-out',
                                    '&:hover': {
                                        color: '$primary',
                                    },
                                }}
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
