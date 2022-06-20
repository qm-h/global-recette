import { Button, Card, Grid, Input, Text } from '@nextui-org/react'

interface Props {
    setCreate: (value: boolean) => void
}

const UserCreateRecipeComponent = ({ setCreate }: Props) => {
    return (
        <Card css={{ h: '80%', w: '35%', borderRadius: '6px' }}>
            <Card.Header>
                <Grid.Container gap={4} alignItems="center">
                    <Grid xs={6} md={11}>
                        <Text h1 b>
                            Créer ma recette 🥗
                        </Text>
                    </Grid>
                    <Grid xs={6} md={1} justify="flex-end">
                        <Button
                            color="error"
                            auto
                            ghost
                            onPress={() => setCreate(false)}
                        >
                            Annuler
                        </Button>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body>
                <Grid.Container gap={2} alignItems="center">
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Input
                            width="60%"
                            labelPlaceholder="Entrer une origine"
                        />
                    </Grid>
                    <Grid xs={12} md={12} justify="center" css={{ w: '100%' }}>
                        <Input
                            width="60%"
                            labelPlaceholder="Entrer une origine"
                        />
                    </Grid>
                </Grid.Container>
            </Card.Body>
        </Card>
    )
}

export default UserCreateRecipeComponent
