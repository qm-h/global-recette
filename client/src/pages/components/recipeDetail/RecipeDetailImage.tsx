import { Card, Col, Loading, Text } from '@nextui-org/react'
import { Recipe } from '../../../../../server/src/shared/types'

interface RecipeDetailImageProps {
    recipe: Recipe
    isDark: boolean
    image: string
    isMobile: boolean
}

const RecipeDetailImage = ({
    recipe,
    isDark,
    image,
    isMobile,
}: RecipeDetailImageProps) => {
    return (
        <Card
            css={{ w: '100%', m: isMobile ? '0' : '', p: isMobile ? '0' : '' }}
            variant={'flat'}
        >
            <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
                <Col
                    css={{
                        p: '$5',
                        bgBlur: isDark ? '#0f111466' : '#ffffff66',
                        borderRadius: '15px',
                        w: 'auto',
                    }}
                >
                    <Text
                        size={12}
                        weight="bold"
                        transform="uppercase"
                        color={'text'}
                    >
                        {recipe?.origin}
                    </Text>
                    <Text h4 color="text">
                        {recipe?.name}
                    </Text>
                </Col>
            </Card.Header>
            {!image ? (
                <Loading
                    css={{
                        margin: '15rem',
                    }}
                    type="points-opacity"
                    size="xl"
                    color="default"
                />
            ) : (
                <Card.Image
                    src={image}
                    maxDelay={2000}
                    width="100%"
                    height="30rem"
                    objectFit="cover"
                    alt="Card image background"
                />
            )}
        </Card>
    )
}

export default RecipeDetailImage
