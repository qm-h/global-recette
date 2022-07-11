import {
    Avatar,
    Button,
    Card,
    Grid,
    Popover,
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
        console.log('cardRecipe', recipeID)
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
                <Grid key={i} xs={4} md={6}>
                    <Card
                        id={`${r.id}`}
                        variant="bordered"
                        css={{
                            borderRadius: '6px',
                            w: '70%',
                            m: 'auto',
                            h: '100%',
                        }}
                    >
                        <Card.Header>
                            <Grid.Container
                                gap={1}
                                justify="center"
                                alignItems="center"
                            >
                                <Grid xs={6} md={7} alignItems="center">
                                    <Text h4 b>
                                        {r.name}
                                    </Text>
                                    {authUserID !== undefined &&
                                        authUserID !== r.created_by && (
                                            <Grid
                                                xs={1}
                                                md={2}
                                                alignItems="center"
                                            >
                                                <FavoritesButton
                                                    hasSaved={hasSaved}
                                                    setHasSaved={setHasSaved}
                                                    authUserID={authUserID}
                                                    isDark={isDark}
                                                    recipe={r}
                                                />
                                            </Grid>
                                        )}
                                    <Grid xs={2} md={2} alignItems="center">
                                        <MdOutlineOpenInFull
                                            size={20}
                                            className="icon-open-in-full"
                                            onClick={() => handleOpen(r.id)}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid xs={6} md={4} justify="flex-end">
                                    <Tooltip
                                        placement="top"
                                        animated={false}
                                        trigger={'click'}
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
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body>
                            <ModalRecipeDetail
                                isOpen={isOpen}
                                onClose={handleClose}
                                recipeID={
                                    recipeID !== undefined ? recipeID : null
                                }
                            />
                        </Card.Body>
                        <Card.Footer>
                            <Grid.Container
                                justify="center"
                                alignItems="center"
                            >
                                <Grid xs={6} md={7}>
                                    <Text css={{ color: '$accents5' }}>
                                        Publié par @{r.user.username}
                                    </Text>
                                </Grid>
                                <Grid xs={6} md={5} justify="flex-end">
                                    <Popover
                                        isBordered={isDark ? true : false}
                                        placement="bottom"
                                    >
                                        <Popover.Trigger>
                                            <Button
                                                auto
                                                flat
                                                css={{
                                                    backgroundColor:
                                                        '$accents2',
                                                    color: '$accents9',
                                                }}
                                                icon={<FaShare />}
                                            />
                                        </Popover.Trigger>
                                        <Popover.Content css={{ p: '$3' }}>
                                            <Grid.Container gap={0}>
                                                <Grid xs={6} md={6}>
                                                    <Button
                                                        auto
                                                        rounded
                                                        light
                                                        color="success"
                                                        onPress={() =>
                                                            handleFacebookShare(
                                                                `${window.location.href}${r.id}`
                                                            )
                                                        }
                                                        icon={
                                                            <TiSocialFacebookCircular
                                                                size={'2em'}
                                                            />
                                                        }
                                                    />
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <Button
                                                        auto
                                                        rounded
                                                        light
                                                        color="success"
                                                        onPress={() =>
                                                            handleTwitterShare(
                                                                `${window.location.href}${r.id}`
                                                            )
                                                        }
                                                        icon={
                                                            <TiSocialTwitterCircular
                                                                size={'2em'}
                                                            />
                                                        }
                                                    />
                                                </Grid>
                                            </Grid.Container>
                                        </Popover.Content>
                                    </Popover>
                                </Grid>
                            </Grid.Container>
                        </Card.Footer>
                    </Card>
                </Grid>
            ))}
        </>
    )
}

export default CardRecipes
