import { Button, Input, Text } from '@nextui-org/react'

import { FaTrashAlt } from 'react-icons/fa'

interface Props {
    isDark: boolean
    ingredient: string
    handleDeleteIngredient: (ingredient: string) => void
    handleAddQuantityIngredient: (ingredient: string, quantity: string) => void
}

const IngredientQuantity = ({
    ingredient,
    isDark,
    handleDeleteIngredient,
    handleAddQuantityIngredient,
}: Props) => {
    return (
        <>
            <Input
                type="text"
                color={'primary'}
                bordered={isDark ? true : false}
                width="20%"
                placeholder="Quantity"
                aria-labelledby="quantity"
                onChange={(e) => {
                    handleAddQuantityIngredient(ingredient, e.target.value)
                }}
            />
            <Text
                className={`${isDark ? 'dark_quantity_text' : 'quantity_text'}`}
                css={{ ml: '$5' }}
            >
                {ingredient}
            </Text>
            <Button
                icon={<FaTrashAlt size={'1em'} />}
                auto
                flat
                rounded
                onPress={() => handleDeleteIngredient(ingredient)}
                color="error"
                css={{ ml: '$5' }}
            />
        </>
    )
}

export default IngredientQuantity
