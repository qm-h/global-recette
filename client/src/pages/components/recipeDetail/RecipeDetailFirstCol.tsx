import { Avatar, Col, Grid, Row, Text } from '@nextui-org/react'
import {
    Recipe,
    RecipeIngredientWithQuantity,
    SuccessAuthUser,
} from '../../../../../server/src/shared/types'
import RecipeDetailImage from './RecipeDetailImage'

interface RecipeDetailFirstColProps {
    recipe: Recipe
    ingredients: RecipeIngredientWithQuantity[]
    isDark: boolean
    user: SuccessAuthUser
    image: string
    isMobile: boolean
}

const RecipeDetailFirstCol = ({
    isDark,
    recipe,
    ingredients,
    user,
    image,
    isMobile,
}) => {
    return (
        <>
            <Grid
                xs={12}
                sm={12}
                md={12}
                css={{
                    m: isMobile ? '0' : '',
                    mb: isMobile ? '$5' : '',
                    p: isMobile ? '0' : '',
                }}
            >
                <RecipeDetailImage
                    isDark={isDark}
                    isMobile={isMobile}
                    recipe={recipe}
                    image={image}
                />
            </Grid>
            <Grid
                xs={12}
                sm={12}
                md={2}
                css={{
                    m: isMobile ? '0' : '',
                    mb: isMobile ? '$5' : '',
                    p: isMobile ? '0' : '',
                }}
                justify={'center'}
                alignItems="center"
            >
                <Avatar
                    bordered
                    size="xl"
                    color="success"
                    css={{
                        zIndex: '0',
                    }}
                    src={
                        user && user.avatar
                            ? user?.avatar
                            : user?.generated_avatar
                    }
                />
            </Grid>
            <Grid
                xs={12}
                sm={12}
                md={10}
                css={{
                    m: isMobile ? '0' : '',
                    mb: isMobile ? '$5' : '',
                    p: isMobile ? '0' : '',
                }}
                alignItems="center"
                justify="flex-start"
            >
                <Text size={20}>
                    <b>{recipe?.creator_username}</b> a pris quelques notes :
                </Text>
            </Grid>
            <Grid>
                <Row>
                    <Col>
                        <Text h4>Ingredients :</Text>
                    </Col>
                </Row>
                {ingredients &&
                    ingredients.map((ingredient, index) => (
                        <Row key={index}>
                            <Col>
                                <Text color={'text'} size={16}>
                                    {ingredient.ingredients.name}
                                </Text>
                            </Col>
                            <Col>
                                <Text color={'text'} size={16}>
                                    Quantité : <b>{ingredient.quantity}</b>
                                </Text>
                            </Col>
                        </Row>
                    ))}
            </Grid>
        </>
    )
}

export default RecipeDetailFirstCol
