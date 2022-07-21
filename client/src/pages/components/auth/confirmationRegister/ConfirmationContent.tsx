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
    isMobile: boolean
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
    isMobile,
}: ConfirmationContentProps) => {
    return (
        <Grid.Container gap={isMobile ? 2 : 4} alignItems="center">
            <Grid xs={12} sm={12} md={12} lg={12} justify="center">
                {isCancel ? (
                    <Text h1>A bientôt ! Réessayer la prochaine fois </Text>
                ) : (
                    <Text h1>Bienvenue !</Text>
                )}
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} justify="center">
                {isCancel ? (
                    <Image src={darkSideGif} objectFit="contain" />
                ) : isConfirmed ? (
                    <Image src={partyGif} objectFit="contain" />
                ) : (
                    <Image objectFit="contain" src={eatingGif} />
                )}
            </Grid>
            <Grid xs={12} sm={12} md={12} lg={12} justify="center">
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
                    <Text
                        h4
                        css={{
                            textAlign: 'center',
                        }}
                    >
                        Veuillez confirmer pour finaliser votre inscription 🔥
                    </Text>
                )}
            </Grid>
            {!isConfirmed && (
                <>
                    <Grid xs={12} sm={12} md={6} lg={6} justify="center">
                        <Tooltip
                            placement="top"
                            trigger="hover"
                            color="error"
                            css={{
                                width: 'fit-content',
                            }}
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
                    <Grid xs={12} sm={12} md={6} lg={6} justify="center">
                        <Tooltip
                            placement="top"
                            trigger="hover"
                            color="success"
                            css={{
                                width: 'fit-content',
                            }}
                            content={
                                "Accepter l'inscription et aller vers le côté de la lumière"
                            }
                        >
                            <Button
                                icon={<FaRebel size="1.5em" />}
                                color="success"
                                auto
                                disabled={isLoading}
                                onPress={handleConfirmation}
                            >
                                {isLoading ? (
                                    <Loading color="currentColor" size="sm" />
                                ) : (
                                    'Confirmer'
                                )}
                            </Button>
                        </Tooltip>
                    </Grid>
                </>
            )}
        </Grid.Container>
    )
}

export default ConfirmationContent
