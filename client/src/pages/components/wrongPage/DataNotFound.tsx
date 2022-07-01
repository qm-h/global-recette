import { Grid, Row, Text } from '@nextui-org/react'

import FaceWrong from './FaceWrong'

interface Props {
    setCreateRecipe?: (val: boolean) => void
}

const DataNotFound = ({ setCreateRecipe }: Props) => {
    return (
        <Grid.Container>
            <Grid xs={12} justify="center">
                <Row>
                    <FaceWrong />
                </Row>
            </Grid>
            <Grid xs={12} justify="center">
                <Text translate="yes" h2 b>
                    Oops! Aucune Recettes Trouvée 🧐
                </Text>
            </Grid>
        </Grid.Container>
    )
}

export default DataNotFound
