import { Card, Collapse, Grid, Row, Spacer, Text } from '@nextui-org/react'

import { Recipe } from '../../../../../server/src/shared/types'

interface Props {
    recipe: Recipe
    index: number
}

const UserRecipeList = ({ recipe, index }: Props) => {
    return (
        <Card variant="bordered" css={{ w: '25%', borderRadius: '6px' }}>
            <Card.Header>
                <Row justify="center">
                    <Text h4 b>
                        {recipe.name}
                    </Text>
                </Row>
            </Card.Header>
            <Card.Body>
                <Row
                    justify="flex-start"
                    css={{ mb: '$5', ml: '$2', w: 'auto' }}
                >
                    <Text b color="#9F9F9F">
                        {recipe.origine}
                    </Text>
                </Row>
                <Row justify="flex-start">
                    <Collapse
                        css={{ fontSize: '12px', w: '50%' }}
                        bordered
                        animated
                        title="Note"
                        subtitle="concernant la recette"
                    >
                        <Text>{recipe.note}</Text>
                    </Collapse>
                </Row>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Text color="#F5B453">Voir les ingredients</Text>
                </Row>
            </Card.Footer>
        </Card>
    )
}

export default UserRecipeList
