import { Button, Modal, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import { MdCloseFullscreen } from 'react-icons/md'
import RecipeDetails from './RecipeDetails'
import { RecipeUser } from '../../../../../server/src/shared/types'
import { getUserByID } from '../../../router/userRouter'

const ModalRecipeDetail = ({ isOpen, onClose, recipe }) => {
    const [recipeUser, setRecipeUser] = useState<RecipeUser>({} as RecipeUser)
    useEffect(() => {
        Promise.all([getUserByID(recipe.created_by)]).then(([user]) => {
            setRecipeUser(user[0])
        })
    }, [recipe.created_by])
    return (
        <Modal aria-labelledby="modal-title" open={isOpen} onClose={onClose}>
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {recipeUser.username} présente la recette{' '}
                    <Text b size={18}>
                        {recipe.name}
                    </Text>
                </Text>
            </Modal.Header>
            <Modal.Body>
                <RecipeDetails recipe={recipe} />
            </Modal.Body>
            <Modal.Footer>
                <Button
                    auto
                    flat
                    color={'error'}
                    icon={<MdCloseFullscreen />}
                    onPress={onClose}
                />
            </Modal.Footer>
        </Modal>
    )
}

export default ModalRecipeDetail
