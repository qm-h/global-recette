import {
    Avatar,
    Button,
    Card,
    Grid,
    Popover,
    Row,
    Text,
    Tooltip,
} from '@nextui-org/react'
import { HasSavedRecipe, Recipe } from '../../../../../server/src/shared/types'
import {
    TiSocialFacebookCircular,
    TiSocialTwitterCircular,
} from 'react-icons/ti'
import {
    followingUser,
    getSavedRecipes,
    unfollowingUser,
} from '../../../router/userRouter'
import { useEffect, useState } from 'react'

import CardImageRecipe from './CardImageRecipe'
import { FaShare } from 'react-icons/fa'
import FavoritesButton from '../common/commonComponents/FavoritesButton'
import { MdOutlineOpenInFull } from 'react-icons/md'
import ModalRecipeDetail from '../common/commonComponents/ModalRecipeDetail'
import UserInfoTooltip from '../common/commonComponents/UserInfoTooltip'

interface CardRecipesProps {
    authUserID?: number
    recipes: Recipe[]
    isDark: boolean
    setIsFollowing: (value: boolean) => void
    isFollowing: boolean
    isUnfollowing: boolean
    setIsUnfollowing: (value: boolean) => void
}

const CardRecipes = ({
    authUserID,
    recipes,
    isDark,
    setIsFollowing,
    isFollowing,
    setIsUnfollowing,
    isUnfollowing,
}: CardRecipesProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [recipeID, setRecipeID] = useState<number>()
    const [hasSaved, setHasSaved] = useState<HasSavedRecipe[]>([
        {} as HasSavedRecipe,
    ])
    const [isLoading, setIsLoading] = useState(false)

    const handleFollowingUser = async (userID, followerID) => {
        setIsLoading(true)
        setIsFollowing(true)
        await followingUser(userID, followerID)
            .then((res) => {
                if (res.status === 200) {
                    setIsFollowing(true)
                }

                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleUnfollowingUser = async (userID, followerID) => {
        setIsLoading(true)
        setIsUnfollowing(true)
        await unfollowingUser(userID, followerID)
            .then((res) => {
                if (res.status === 200) {
                    setIsUnfollowing(true)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleOpen = (recipeID: number) => {
        console.log(recipeID)
        if (recipeID !== undefined) {
            setRecipeID(recipeID)
            setIsOpen(true)
        }
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleTwitterShare = (url: string) => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${url}`
        window.open(twitterUrl, '_blank')
    }

    const handleFacebookShare = (url: string) => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
        window.open(facebookUrl, '_blank')
    }

    useEffect(() => {
        if (authUserID) {
            getSavedRecipes(authUserID).then((res) => {
                if (res) {
                    const savedRecipes = res.map((re) => re.recipe_id)
                    const newHasSaved = []
                    recipes.forEach((re) => {
                        const hasSaved: HasSavedRecipe = {
                            favorite: savedRecipes.includes(re.id),
                            recipeID: re.id,
                        }
                        newHasSaved.push(hasSaved)
                    })
                    setHasSaved(newHasSaved)
                }
            })
        }
    }, [authUserID, recipes])

    return (
        <>
            {recipes.map((r, i) => (
                <Grid key={i} md={2.5}>
                    <Card
                        css={{ ml: '$5', mr: '$5' }}
                        isHoverable
                        variant={isDark ? 'bordered' : 'flat'}
                        isPressable
                        onClick={() => handleOpen(r.id)}
                    >
                        <Card.Header
                            css={{ position: 'absolute', zIndex: 1, top: 2 }}
                        >
                            {authUserID !== undefined &&
                                authUserID !== r.created_by && (
                                    <Grid xs={1} md={2} alignItems="center">
                                        <FavoritesButton
                                            hasSaved={hasSaved}
                                            setHasSaved={setHasSaved}
                                            authUserID={authUserID}
                                            isDark={isDark}
                                            recipe={r}
                                        />
                                    </Grid>
                                )}
                        </Card.Header>
                        <Card.Body css={{ p: 0 }}>
                            <CardImageRecipe recipe={r} />
                        </Card.Body>
                        <Card.Footer css={{ justifyItems: 'flex-start' }}>
                            <Row
                                wrap="wrap"
                                justify="space-between"
                                align="center"
                            >
                                <Text b>{r.name}</Text>
                                <Tooltip
                                    placement="top"
                                    animated={false}
                                    trigger={'hover'}
                                    content={
                                        <UserInfoTooltip
                                            isLoading={isLoading}
                                            isFollowing={isFollowing}
                                            isUnfollowing={isUnfollowing}
                                            handleFollowingUser={
                                                handleFollowingUser
                                            }
                                            handleUnfollowingUser={
                                                handleUnfollowingUser
                                            }
                                            userRecipe={r.user}
                                        />
                                    }
                                >
                                    <Avatar
                                        pointer
                                        size="lg"
                                        src={r.user.generated_avatar}
                                        color="primary"
                                        bordered
                                    />
                                </Tooltip>
                            </Row>
                        </Card.Footer>
                        <ModalRecipeDetail
                            isOpen={isOpen}
                            onClose={handleClose}
                            recipeID={recipeID !== undefined ? recipeID : null}
                        />
                    </Card>
                </Grid>
            ))}
        </>
    )
}

export default CardRecipes
