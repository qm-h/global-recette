import { Avatar, Button, Card, Grid, Popover, Text } from '@nextui-org/react'
import {
    TiSocialFacebookCircular,
    TiSocialInstagramCircular,
    TiSocialTwitterCircular,
} from 'react-icons/ti'
import { useEffect, useState } from 'react'

import FavoritesButton from '../common/commonComponents/FavoritesButton'
import { FiShare } from 'react-icons/fi'
import { MdOutlineOpenInFull } from 'react-icons/md'
import ModalRecipeDetail from './ModalRecipeDetail'
import { Recipe } from '../../../../../server/src/shared/types'
import { getSavedRecipes } from '../../../router/userRouter'

interface CardRecipesProps {
    authUserID?: number
    recipes: Recipe[]
    isDark: boolean
}

const CardRecipes = ({ authUserID, recipes, isDark }: CardRecipesProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [hasSaved, setHasSaved] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

    useEffect(() => {
        Promise.all([getSavedRecipes(authUserID)])
            .then(([res]) => {
                res.forEach((recipe) => {
                    if (recipe.recipe_id === recipes[0].id) {
                        setHasSaved(true)
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }, [authUserID, recipes])

    return (
        <>
            {recipes.map((r, i) => (
                <Grid key={i} xs={4}>
                    <Card
                        variant="bordered"
                        css={{
                            borderRadius: '6px',
                            w: '70%',
                        }}
                    >
                        <Card.Header>
                            <Grid.Container gap={1} alignItems="center">
                                <Grid xs={6} md={5}>
                                    <Text h4 b>
                                        {r.name}
                                    </Text>
                                    {authUserID !== undefined &&
                                        authUserID !== r.created_by && (
                                            <Grid xs={1} md={3}>
                                                <FavoritesButton
                                                    hasSaved={hasSaved}
                                                    setHasSaved={setHasSaved}
                                                    authUserID={authUserID}
                                                    isDark={isDark}
                                                    recipe={r}
                                                />
                                            </Grid>
                                        )}
                                </Grid>
                                <Grid xs={2} md={2}>
                                    <Button
                                        auto
                                        light
                                        onPress={handleOpen}
                                        icon={<MdOutlineOpenInFull />}
                                    />
                                </Grid>
                                <Grid xs={6} md={4} justify="flex-end">
                                    <Avatar
                                        size="lg"
                                        src={r.user.avatar}
                                        color="primary"
                                        bordered
                                    />
                                </Grid>
                            </Grid.Container>
                        </Card.Header>
                        <Card.Body>
                            <ModalRecipeDetail
                                isOpen={isOpen}
                                onClose={handleClose}
                                recipe={r}
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
                                    <Popover isBordered={isDark ? true : false}>
                                        <Popover.Trigger>
                                            <Button
                                                auto
                                                flat
                                                css={{
                                                    backgroundColor:
                                                        '$accents2',
                                                    color: '$accents9',
                                                }}
                                                icon={<FiShare />}
                                            />
                                        </Popover.Trigger>
                                        <Popover.Content css={{ p: '$3' }}>
                                            <Grid.Container gap={0}>
                                                <Grid xs={6} md={4}>
                                                    <Button
                                                        auto
                                                        rounded
                                                        light
                                                        color="success"
                                                        icon={
                                                            <TiSocialFacebookCircular
                                                                size={'2em'}
                                                            />
                                                        }
                                                    />
                                                </Grid>
                                                <Grid xs={6} md={4}>
                                                    <Button
                                                        auto
                                                        rounded
                                                        light
                                                        color="success"
                                                        icon={
                                                            <TiSocialTwitterCircular
                                                                size={'2em'}
                                                            />
                                                        }
                                                    />
                                                </Grid>
                                                <Grid xs={6} md={4}>
                                                    <Button
                                                        auto
                                                        rounded
                                                        light
                                                        color="success"
                                                        icon={
                                                            <TiSocialInstagramCircular
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
