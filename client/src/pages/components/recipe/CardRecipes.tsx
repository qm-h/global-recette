import {
    Avatar,
    Button,
    Card,
    Grid,
    Loading,
    Row,
    Text,
    Tooltip,
} from '@nextui-org/react'
import { HasSavedRecipe, Recipe } from '../../../../../server/src/shared/types'
import {
    followingUser,
    getSavedRecipes,
    unfollowingUser,
} from '../../../router/userRouter'
import { useEffect, useState } from 'react'

import CardImageRecipe from './CardImageRecipe'
import FavoritesButton from '../common/commonComponents/FavoritesButton'
import UserInfoTooltip from '../common/commonComponents/UserInfoTooltip'
import { TbExternalLink } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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
    const [hasSaved, setHasSaved] = useState<HasSavedRecipe[]>([
        {} as HasSavedRecipe,
    ])
    const [isLoadingFollowing, setIsLoadingFollowing] = useState(false)
    const [isLoadingRecipe, setIsLoadingRecipe] = useState(true)
    const navigate = useNavigate()

    const handleFollowingUser = async (userID, followerID) => {
        setIsLoadingFollowing(true)
        setIsFollowing(true)
        await followingUser(userID, followerID)
            .then((res) => {
                if (res.status === 200) {
                    setIsFollowing(true)
                }

                setIsLoadingFollowing(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleUnfollowingUser = async (userID, followerID) => {
        setIsLoadingFollowing(true)
        setIsUnfollowing(true)
        await unfollowingUser(userID, followerID)
            .then((res) => {
                if (res.status === 200) {
                    setIsUnfollowing(true)
                }
                setIsLoadingFollowing(false)
            })
            .catch((err) => {
                console.log(err)
            })
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
            getSavedRecipes(authUserID)
                .then((res) => {
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
                    setIsLoadingRecipe(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [authUserID, recipes])

    return (
        <>
            {recipes.map((r, i) => (
                <Grid key={i} md={2.5} justify="center" alignItems="center">
                    {authUserID && isLoadingRecipe ? (
                        <>
                            {!isDark ? (
                                <Skeleton
                                    style={{
                                        marginLeft: '0.5rem',
                                        marginRight: '0.5rem',
                                    }}
                                    width="19rem"
                                    height="20rem"
                                    borderRadius={15}
                                />
                            ) : (
                                <Loading css={{}} />
                            )}
                        </>
                    ) : (
                        <Card
                            css={{
                                ml: '$5',
                                mr: '$5',
                                w: '100%',
                                h: '20rem',
                                justifyContent: isLoadingRecipe ? 'center' : '',
                            }}
                            variant={'flat'}
                        >
                            <Card.Header
                                css={{
                                    position: 'absolute',
                                    zIndex: 1,
                                    top: 0,
                                    m: '$0',
                                    p: '$5',
                                }}
                            >
                                <Row justify="flex-start">
                                    <Tooltip
                                        content="Voir plus"
                                        color="success"
                                        animated={false}
                                    >
                                        <Button
                                            css={{
                                                p: '$3',
                                                m: '$0',
                                            }}
                                            auto
                                            size="sm"
                                            onPress={() =>
                                                navigate({
                                                    pathname: `/recette/${r.id}`,
                                                })
                                            }
                                        >
                                            <TbExternalLink
                                                size={20}
                                                className={'openRecipeDetails'}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Row>
                                <Row justify="flex-end">
                                    {authUserID !== undefined &&
                                        authUserID !== r.created_by && (
                                            <Tooltip
                                                color="error"
                                                rounded={false}
                                                animated={false}
                                                content="Mettre en Favoris"
                                            >
                                                <FavoritesButton
                                                    hasSaved={hasSaved}
                                                    setHasSaved={setHasSaved}
                                                    authUserID={authUserID}
                                                    isDark={isDark}
                                                    recipe={r}
                                                />
                                            </Tooltip>
                                        )}
                                </Row>
                            </Card.Header>
                            <Card.Body css={{ p: 0 }}>
                                <CardImageRecipe recipe={r} />
                            </Card.Body>
                            <Card.Footer
                                isBlurred
                                css={{
                                    position: 'absolute',
                                    bgBlur: isDark ? '#0f111466' : '#ffffff66',
                                    borderTop:
                                        '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
                                    bottom: 0,
                                    zIndex: 1,
                                }}
                            >
                                <Row
                                    wrap="wrap"
                                    justify="space-between"
                                    align="center"
                                >
                                    <Text b size={15}>
                                        {r.name}
                                    </Text>
                                    <Tooltip
                                        placement="top"
                                        animated={false}
                                        trigger={'hover'}
                                        content={
                                            <UserInfoTooltip
                                                isLoading={isLoadingFollowing}
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
                        </Card>
                    )}
                </Grid>
            ))}
        </>
    )
}

export default CardRecipes
