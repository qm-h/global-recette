import { Input, Text } from '@nextui-org/react'

import { FaTrashAlt } from 'react-icons/fa'

interface Props {
    isDark: boolean
    ingredient: string
    handleDeleteIngredient: (ingredient: string) => void
    handleAddQuantityIngredient: (ingredient: string, quantity: string) => void
    isMobile: boolean
}

const IngredientQuantity = ({
    ingredient,
    isDark,
    handleDeleteIngredient,
    handleAddQuantityIngredient,
    isMobile,
}: Props) => {
    return (
        <>
            <Input
                type="text"
                color={'primary'}
                bordered={isDark ? true : false}
                width={isMobile ? '50%' : '20%'}
                placeholder="Quantité"
                aria-labelledby="Quantité"
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
