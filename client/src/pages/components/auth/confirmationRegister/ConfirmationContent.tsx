import { Button, Grid, Image, Loading, Text } from '@nextui-org/react'
import { FaEmpire, FaRebel } from 'react-icons/fa'

interface ConfirmationContentProps {
    isConfirmed: boolean
    partyGif: string
    eatingGif: string
    handleCancel: () => void
    isLoading: boolean
    handleConfirmation: () => void
}

const ConfirmationContent = ({
    isConfirmed,
    partyGif,
    eatingGif,
    handleCancel,
    isLoading,
    handleConfirmation,
}: ConfirmationContentProps) => {
    return (
        <Grid.Container gap={4} alignItems="center">
            <Grid md={12} justify="center">
                <Text h1>Bienvenue !</Text>
            </Grid>
            <Grid md={12} justify="center">
                {isConfirmed ? (
                    <Image src={partyGif} objectFit="contain" />
                ) : (
                    <Image objectFit="contain" src={eatingGif} />
                )}
            </Grid>
            <Grid md={12} justify="center">
                {isConfirmed ? (
                    <Text h4>Vous avez confirmé votre email avec succès !</Text>
                ) : (
                    <Text h4>
                        Veuillez confirmer pour finaliser votre inscription 🔥
                    </Text>
                )}
            </Grid>
            <Grid md={6} justify="center">
                <Button
                    icon={<FaEmpire size="2em" />}
                    color={'error'}
                    flat
                    onPress={handleCancel}
                />
            </Grid>

            <Grid md={6} justify="center">
                {isLoading ? (
                    <Button disabled auto flat>
                        <Loading color="currentColor" size="sm" />
                    </Button>
                ) : (
                    <Button
                        icon={<FaRebel size="2em" />}
                        flat
                        color="success"
                        onPress={handleConfirmation}
                    />
                )}
            </Grid>
        </Grid.Container>
    )
}

export default ConfirmationContent
