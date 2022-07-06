import {
    Avatar,
    Button,
    Card,
    Grid,
    Image,
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
import { useEffect, useState } from 'react'

import { FaShare } from 'react-icons/fa'
import FavoritesButton from '../common/commonComponents/FavoritesButton'
import { MdOutlineOpenInFull } from 'react-icons/md'
import ModalRecipeDetail from './ModalRecipeDetail'
import UserInfoTooltip from '../common/commonComponents/UserInfoTooltip'
import { getSavedRecipes } from '../../../router/userRouter'

interface CardRecipesProps {
    authUserID?: number
    recipes: Recipe[]
    isDark: boolean
}

const CardRecipes = ({ authUserID, recipes, isDark }: CardRecipesProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [recipeID, setRecipeID] = useState<number>()
    const [hasSaved, setHasSaved] = useState<HasSavedRecipe[]>([
        {} as HasSavedRecipe,
    ])

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
                                    <Grid xs={2} md={1} alignItems="center">
                                        <Button
                                            auto
                                            light
                                            onPress={() => handleOpen(r.id)}
                                            icon={<MdOutlineOpenInFull />}
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
                                                userRecipe={r.user}
                                                onClick={() =>
                                                    console.log('click')
                                                }
                                            />
                                        }
                                    >
                                        <Avatar
                                            pointer
                                            size="lg"
                                            src={r.user.avatar}
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
