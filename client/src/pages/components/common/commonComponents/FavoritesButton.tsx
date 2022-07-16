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
    color?: string
    isMobile?: boolean
}

const FavoritesButton = ({
    hasSaved,
    setHasSaved,
    authUserID,
    isDark,
    recipe,
    color,
    isMobile,
}: FavoritesButtonProps) => {
    const handleSave = async (recipeID: number) => {
        console.log(recipeID)
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
        <Button
            css={{
                p: isMobile ? '' : '$5',
                // pb: isMobile ? '$5' :'',
                m: '$0',
                bgBlur: isDark ? '#0f111466' : '#ffffff66',
            }}
            auto
            size="sm"
        >
            {hasSaved.find(
                (h) => h.recipeID === recipe.id && h.favorite === true
            ) ? (
                <AiFillHeart
                    size={20}
                    color={color}
                    className={'favoriteButton'}
                    onClick={() => handleUnSave(recipe.id)}
                />
            ) : (
                <AiOutlineHeart
                    color={color}
                    size={20}
                    className={'favoriteButton'}
                    onClick={() => handleSave(recipe.id)}
                />
            )}
        </Button>
    )
}

export default FavoritesButton
