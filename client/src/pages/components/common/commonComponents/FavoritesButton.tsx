import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import {
    HasSavedRecipe,
    Recipe,
} from '../../../../../../server/src/shared/types'
import {
    removeSavedRecipe,
    saveRecipeToFavorite,
} from '../../../../router/userRouter'
import {
    toasterErrorCommon,
    toasterSuccessCommon,
} from '../../../../utils/theme/toaster'
import { Button } from '@nextui-org/react'

interface FavoritesButtonProps {
    hasSaved: HasSavedRecipe[]
    setHasSaved: (hasSaved: HasSavedRecipe[]) => void
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
                    const newHasSaved: HasSavedRecipe[] = [
                        ...hasSaved,
                        {
                            favorite: true,
                            recipeID,
                        },
                    ]
                    setHasSaved(newHasSaved)
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
                const x = hasSaved.filter((h) => h.recipeID !== recipeID)
                setHasSaved(x)

                toasterSuccessCommon(isDark, 'Recette retirée de vos favoris')
            } else {
                toasterErrorCommon(isDark, 'Une erreur est survenue')
            }
        })
    }
    return (
        <>
            {hasSaved.find(
                (h) => h.recipeID === recipe.id && h.favorite === true
            ) ? (
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
