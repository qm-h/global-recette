import 'react-loading-skeleton/dist/skeleton.css'

import {
    Avatar,
    Button,
    Card,
    Col,
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
import { FaShare } from 'react-icons/fa'
import FavoritesButton from '../common/commonComponents/FavoritesButton'
import Skeleton from 'react-loading-skeleton'
import SocialShare from '../common/commonComponents/SocialShare'
import { TbExternalLink } from 'react-icons/tb'
import UserInfoTooltip from '../common/commonComponents/UserInfoTooltip'
import { useNavigate } from 'react-router-dom'

interface CardRecipesProps {
    authUserID?: number
    recipes: Recipe[]
    isDark: boolean
    setIsFollowing: (value: boolean) => void
    isFollowing: boolean
    isUnfollowing: boolean
    setIsUnfollowing: (value: boolean) => void
    isMobile: boolean
}

const CardRecipes = ({
    authUserID,
    recipes,
    isDark,
    setIsFollowing,
    isFollowing,
    setIsUnfollowing,
    isUnfollowing,
    isMobile,
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

    useEffect(() => {
        if (authUserID && authUserID !== undefined) {
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
                <Grid
                    key={i}
                    xs={12}
                    md={3.5}
                    lg={3}
                    justify="center"
                    alignItems="center"
                >
                    {authUserID && isLoadingRecipe ? (
                        <>
                            {!isDark ? (
                                <Skeleton
                                    style={{
                                        marginLeft: '0.5rem',
                                        marginRight: '0.5rem',
                                    }}
                                    width="20rem"
                                    height="20rem"
                                    borderRadius={15}
                                />
                            ) : (
                                <Loading />
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
                                <Row
                                    justify="flex-start"
                                    css={{
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Tooltip
                                        content="Voir plus"
                                        color="success"
                                        hideArrow
                                        animated={false}
                                        css={{
                                            width: 'fit-content',
                                        }}
                                    >
                                        <Button
                                            css={{
                                                p: '$5',
                                                m: '$0',
                                                bgBlur: isDark
                                                    ? '#0f111466'
                                                    : '#ffffff66',
                                            }}
                                            auto
                                            flat={isDark}
                                            size="sm"
                                            onPress={() =>
                                                navigate({
                                                    pathname: `/recette/${r.id}`,
                                                })
                                            }
                                        >
                                            <TbExternalLink
                                                size={20}
                                                color={
                                                    isDark
                                                        ? '#ffffff'
                                                        : '#ffffff'
                                                }
                                                className={'openRecipeDetails'}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Row>
                                <Row
                                    justify="flex-end"
                                    css={{
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    {authUserID !== undefined &&
                                        authUserID !== r.created_by && (
                                            <Tooltip
                                                color="error"
                                                rounded={false}
                                                animated={false}
                                                content="Mettre en Favoris"
                                                css={{
                                                    width: 'fit-content',
                                                }}
                                                hideArrow
                                            >
                                                <FavoritesButton
                                                    hasSaved={hasSaved}
                                                    setHasSaved={setHasSaved}
                                                    authUserID={authUserID}
                                                    isDark={isDark}
                                                    recipe={r}
                                                    color={'#ffffff'}
                                                />
                                            </Tooltip>
                                        )}
                                    <Tooltip
                                        hideArrow
                                        css={{
                                            p: '$0',
                                            width: 'fit-content',
                                        }}
                                        content={
                                            <SocialShare
                                                isDark={isDark}
                                                recipe={r}
                                            />
                                        }
                                        animated={false}
                                        color={isDark ? 'default' : 'success'}
                                    >
                                        <Button
                                            css={{
                                                p: '$5',
                                                ml: '$5',
                                                bgBlur: isDark
                                                    ? '#0f111466'
                                                    : '#ffffff66',
                                            }}
                                            auto
                                            flat={isDark}
                                            size="sm"
                                        >
                                            <FaShare color={'#fff'} />
                                        </Button>
                                    </Tooltip>
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
                                    <Text b size={15} color={'white'}>
                                        {r.name}
                                    </Text>
                                    <Tooltip
                                        placement="topEnd"
                                        animated={false}
                                        trigger={'hover'}
                                        hideArrow
                                        content={
                                            <UserInfoTooltip
                                                isMobile={isMobile}
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
