import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {
    removeSavedRecipe,
    saveRecipeToFavorite,
} from '../../../../router/userRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../lib/theme/toaster'

import { Recipe } from '../../../../../../server/src/shared/types'

interface FavoritesButtonProps {
    hasSaved: boolean
    setHasSaved: (hasSaved: boolean) => void
    authUserID: number
    isDark: boolean
    recipe: Recipe
}

const FavoritesButton = ({
    hasSaved,
    setHasSaved,
    authUserID,
    isDark,
    recipe,
}: FavoritesButtonProps) => {
    const handleSave = async (recipeID: number) => {
        await saveRecipeToFavorite(recipeID, authUserID)
            .then((res) => {
                if (res.status === 200) {
                    toasterSuccessCommon(
                        isDark,
                        'Recette ajoutée à vos favoris',
                        '💚'
                    )
                    setHasSaved(true)
                } else {
                    toasterErrorCommon(isDark, 'Une erreur est survenue')
                }
            })
            .catch((err) => {
                console.log(err)
                toasterErrorCommon(isDark, 'Une erreur est survenue')
            })
    }

    const handleUnSave = async (recipeID: number) => {
        await removeSavedRecipe(recipeID, authUserID).then((res) => {
            if (res.status === 200) {
                setHasSaved(false)
                toasterSuccessCommon(isDark, 'Recette retirée de vos favoris')
            } else {
                toasterErrorCommon(isDark, 'Une erreur est survenue')
            }
        })
    }
    return (
        <>
            {hasSaved ? (
                <AiFillHeart
                    className={'favoriteButton'}
                    onClick={() => handleUnSave(recipe.id)}
                />
            ) : (
                <AiOutlineHeart
                    className={'favoriteButton'}
                    onClick={() => handleSave(recipe.id)}
                />
            )}
        </>
    )
}

export default FavoritesButton
