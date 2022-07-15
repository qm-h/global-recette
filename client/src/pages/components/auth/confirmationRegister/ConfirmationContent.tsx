import { Button, Grid, Image, Loading, Text, Tooltip } from '@nextui-org/react'
import { FaEmpire, FaRebel } from 'react-icons/fa'

interface ConfirmationContentProps {
    isConfirmed: boolean
    partyGif: string
    eatingGif: string
    handleCancel: () => void
    isLoading: boolean
    handleConfirmation: () => void
    isCancel: boolean
    darkSideGif: string
}

const ConfirmationContent = ({
    isConfirmed,
    partyGif,
    eatingGif,
    darkSideGif,
    handleCancel,
    isLoading,
    isCancel,
    handleConfirmation,
}: ConfirmationContentProps) => {
    return (
        <Grid.Container gap={4} alignItems="center">
            <Grid md={12} justify="center">
                {isCancel ? (
                    <Text h1>A bientôt ! Réessayer la prochaine fois </Text>
                ) : (
                    <Text h1>Bienvenue !</Text>
                )}
            </Grid>
            <Grid md={12} justify="center">
                {isCancel ? (
                    <Image src={darkSideGif} objectFit="contain" />
                ) : isConfirmed ? (
                    <Image src={partyGif} objectFit="contain" />
                ) : (
                    <Image objectFit="contain" src={eatingGif} />
                )}
            </Grid>
            <Grid md={12} justify="center">
                {isCancel ? (
                    <Text h4>
                        Vous avez choisis le côté obscure de la force ...{' '}
                    </Text>
                ) : isConfirmed ? (
                    <Text h4>
                        Vous avez confirmé votre email avec succès ! Bienvenue
                        du côté de la lumière !
                    </Text>
                ) : (
                    <Text h4>
                        Veuillez confirmer pour finaliser votre inscription 🔥
                    </Text>
                )}
            </Grid>
            <Grid md={6} justify="center">
                <Tooltip
                    placement="top"
                    trigger="hover"
                    color="error"
                    content={
                        "Refuser l'inscription et aller vers le côté obscur"
                    }
                >
                    <Button
                        iconRight={<FaEmpire size="1.5em" />}
                        color={'error'}
                        auto
                        onPress={handleCancel}
                    >
                        Annuler la Confirmation
                    </Button>
                </Tooltip>
            </Grid>
            <Grid md={6} justify="center">
                <Tooltip
                    placement="top"
                    trigger="hover"
                    color="success"
                    content={
                        "Accepter l'inscription et aller vers le côté de la lumière"
                    }
                >
                    {isLoading ? (
                        <Button disabled auto flat>
                            <Loading color="currentColor" size="sm" />
                        </Button>
                    ) : (
                        <Button
                            icon={<FaRebel size="1.5em" />}
                            auto
                            color="success"
                            onPress={handleConfirmation}
                        >
                            Confirmer
                        </Button>
                    )}
                </Tooltip>
            </Grid>
        </Grid.Container>
    )
}

export default ConfirmationContent
