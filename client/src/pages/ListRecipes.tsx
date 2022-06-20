import {
    Card,
    Container,
    Grid,
    Input,
    Loading,
    Row,
    Spacer,
    Text,
} from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'

import { Recipe } from '../../../server/src/shared/types'
import { getAllRecipesWithUser } from '../api/recipesRouter'
import { useNavigate } from 'react-router-dom'

const ListRecipes = () => {
    const [recipesData, setRecipesData] = useState<Recipe[]>([])
    const [recipeList, setRecipeList] = useState<Recipe[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()
    const handleOnClick = useCallback(
        (id) => navigate(`/detail/${id}`, { replace: true }),
        [navigate]
    )

    const handleSearchRecipe = (event) => {
        let value = event.target.value
        let newList = recipesData.filter((re) =>
            re.name.toLowerCase().startsWith(value.toLowerCase())
        )
        setRecipeList(newList)
    }

    useEffect(() => {
        ;(async () => {
            const promiseResult = await Promise.all([getAllRecipesWithUser()])
            setRecipesData(promiseResult[0])
            setIsLoading(false)
        })()
    }, [])

    useEffect(() => {
        setRecipeList(recipesData)
    }, [recipesData])

    return (
        <Container
            css={{
                h: '100vh',
                w: '90%',
            }}
            display="flex"
            justify="center"
            alignItems="center"
            responsive
        >
            <Card css={{ w: '50%', h: '70%', borderRadius: '6px' }}>
                <Card.Header>
                    <Row justify="center">
                        <Text h2 b>
                            Recette du Moment 🚀
                        </Text>
                    </Row>
                </Card.Header>
                <Card.Divider />
                <Spacer />
                <Row justify="center">
                    <Input
                        css={{ w: '50%' }}
                        clearable
                        bordered
                        color="warning"
                        onChange={handleSearchRecipe}
                        placeholder="Rechercher une recette"
                    />
                </Row>
                <Card.Body css={{ p: '2em', w: '100%' }}>
                    <Spacer />
                    <Grid.Container
                        gap={2}
                        wrap="wrap"
                        justify={isLoading ? 'center' : 'space-around'}
                        alignItems="center"
                        alignContent="center"
                    >
                        {isLoading ? (
                            <Loading type="points" />
                        ) : (
                            recipeList.map((r, i) => (
                                <Grid key={i} xs={4}>
                                    <Card
                                        variant="bordered"
                                        css={{ borderRadius: '6px' }}
                                        isPressable
                                    >
                                        <Card.Header>
                                            <Text h4 b>
                                                {r.name}
                                            </Text>
                                        </Card.Header>
                                        <Card.Body>
                                            <Text>
                                                Origine de la recette :{' '}
                                                {r.origine}
                                            </Text>
                                            <Text>
                                                Note concernant la recette :{' '}
                                                {r.note}
                                            </Text>
                                        </Card.Body>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid.Container>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ListRecipes
