import { Button, Grid, Link } from '@nextui-org/react'

import NotFoundIcon from '../utils/theme/Icons/NotFoundIcon'

const NotFoundPage = () => {
    return (
        <div className="main">
            <Grid.Container>
                <Grid md={12} justify="center">
                    <NotFoundIcon />
                </Grid>
                <Grid md={12} justify="center">
                    <Button auto color="success">
                        <Link href="/" animated color="text">
                            Retour à l'accueil
                        </Link>
                    </Button>
                </Grid>
            </Grid.Container>
        </div>
    )
}

export default NotFoundPage
