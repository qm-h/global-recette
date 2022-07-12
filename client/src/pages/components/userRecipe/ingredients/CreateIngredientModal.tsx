import { Button, Grid, Input, Loading, Modal, Text } from '@nextui-org/react'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../utils/theme/toaster'

import { MdOutlineFastfood } from 'react-icons/md'
import { createIngredient } from '../../../../router/ingredientsRouter'
import { useState } from 'react'

const CreateIngredientModal = ({
    isOpen,
    setIsOpen,
    isDark,
    setIngredientCreated,
    ingredientCreated,
}) => {
    const [ingredient, setIngredient] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleCreateIngredient = async () => {
        setIsLoading(!isLoading)
        await createIngredient(
            ingredient.charAt(0).toUpperCase() + ingredient.slice(1)
        )
            .then((res) => {
                switch (res.status) {
                    case 200:
                        setIsLoading(false)
                        setIngredient('')
                        setIsOpen(!isOpen)
                        setIngredientCreated(!ingredientCreated)
                        return toasterSuccessCommon(isDark, 'Ingrédient créé')
                    case 400:
                        setIsLoading(false)
                        return toasterErrorCommon(
                            isDark,
                            'Ingrédient déjà existant'
                        )
                    default:
                        setIsLoading(false)
                        return toasterErrorCommon(
                            isDark,
                            'Erreur lors de la création'
                        )
                }
            })
            .catch(() => {
                setIngredient('')
                setIsLoading(!isLoading)
                setIsOpen(false)
            })
    }

    const onClose = () => setIsOpen(false)

    return (
        <Modal open={isOpen} preventClose autoMargin onClose={onClose}>
            <Modal.Header>Créer un ingrédient</Modal.Header>
            <Modal.Body>
                <Grid.Container gap={1}>
                    <Grid md={12} justify="center">
                        <Text small color="warning">
                            L'ingrédient doit être uniquement au singulier
                        </Text>
                    </Grid>
                    <Grid md={12}>
                        <Input
                            width="100%"
                            bordered={isDark}
                            type="text"
                            color="primary"
                            name="name"
                            id="name"
                            aria-label="name"
                            contentLeft={<MdOutlineFastfood />}
                            onChange={(e) => setIngredient(e.target.value)}
                            value={ingredient}
                        />
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
                <Grid.Container justify="center" alignContent="center">
                    <Grid md={6} justify="center">
                        <Button auto color="error" onClick={onClose}>
                            Annuler
                        </Button>
                    </Grid>
                    <Grid md={6} justify="center">
                        <Button
                            onPress={handleCreateIngredient}
                            auto
                            color="primary"
                            disabled={!ingredient || isLoading}
                        >
                            {isLoading ? (
                                <Loading
                                    size="md"
                                    color="currentColor"
                                    type="points-opacity"
                                />
                            ) : (
                                'Créer'
                            )}
                        </Button>
                    </Grid>
                </Grid.Container>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateIngredientModal
