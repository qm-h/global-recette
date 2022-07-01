import { useEffect, useMemo, useState } from 'react'

import { Dropdown } from '@nextui-org/react'
import { Ingredients } from '../../../../../server/src/shared/types'
import { Selection } from '@nextui-org/react/dropdown'

interface Props {
    ingredientsList: Ingredients[]
    setSelectedIngredients: (value: string) => void
}

const IngredientDropDown = ({
    ingredientsList,
    setSelectedIngredients,
}: Props) => {
    const [selected, setSelected] = useState<Selection>(new Set([]))

    const selectedValue = useMemo(
        () => Array.from(selected).join(', ').replaceAll('_', ' '),
        [selected]
    )

    useEffect(() => {
        setSelectedIngredients(selectedValue)
    }, [selectedValue, setSelectedIngredients])

    return (
        <Dropdown>
            <Dropdown.Button
                animated
                color="primary"
                css={{ tt: 'capitalize' }}
                auto
            >
                {selectedValue === '' ? 'Choisir un ingrédient' : selectedValue}
            </Dropdown.Button>
            <Dropdown.Menu
                color="primary"
                disallowEmptySelection
                variant="flat"
                selectionMode="single"
                selectedKeys={selected}
                onSelectionChange={setSelected}
                disabledKeys={['no_ingredient']}
            >
                {ingredientsList.length > 0 ? (
                    ingredientsList.map((ingredient) => (
                        <Dropdown.Item key={ingredient.name}>
                            {ingredient.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item key="no_ingredients">
                        Aucun ingrédient
                    </Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default IngredientDropDown
