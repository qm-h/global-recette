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
            <FaTrashAlt
                style={{
                    color: '#F31260',
                    marginTop: '.7rem',
                    marginLeft: '1rem',
                    cursor: 'pointer',
                }}
                size={'1em'}
                onClick={() => handleDeleteIngredient(ingredient)}
            />
        </>
    )
}

export default IngredientQuantity
