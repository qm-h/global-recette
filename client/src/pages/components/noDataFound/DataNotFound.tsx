import { Grid, Row, Text } from '@nextui-org/react'

import FaceWrong from './FaceWrong'

interface Props {
    isMobile?: boolean
}

const DataNotFound = ({ isMobile }: Props) => {
    return (
        <Grid.Container>
            <Grid xs={12} md={12} lg={12} justify="center">
                <Row>
                    <FaceWrong />
                </Row>
            </Grid>
            <Grid xs={12} md={12} lg={12} justify="center">
                <Text translate="yes" h2={!isMobile} h3={isMobile} b>
                    Oops! Aucune Recettes Trouvée
                </Text>
            </Grid>
        </Grid.Container>
    )
}

export default DataNotFound
