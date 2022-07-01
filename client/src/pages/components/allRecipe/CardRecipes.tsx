import { Avatar, Button, Card, Grid, Popover, Text } from '@nextui-org/react'
import {
    TiSocialFacebookCircular,
    TiSocialInstagramCircular,
    TiSocialTwitterCircular,
} from 'react-icons/ti'

import { FiShare } from 'react-icons/fi'
import { MdOutlineOpenInFull } from 'react-icons/md'
import ModalRecipeDetail from './ModalRecipeDetail'
import { Recipe } from '../../../../../server/src/shared/types'
import { useState } from 'react'

interface Props {
    recipes: Recipe[]
    isDark: boolean
}

const CardRecipes = ({ recipes, isDark }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true)
    }

    const handleClose = () => {
        setIsOpen(false)
    }

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
                                <Grid xs={6} md={4}>
                                    <Text h4 b>
                                        {r.name}
                                    </Text>
                                </Grid>
                                <Grid xs={6} md={2}>
                                    <Button
                                        auto
                                        light
                                        onPress={handleOpen}
                                        icon={<MdOutlineOpenInFull />}
                                    />
                                </Grid>
                                <Grid xs={6} md={6} justify="flex-end">
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
                                    <Text color="primary">
                                        Publié par @{r.user.username}
                                    </Text>
                                </Grid>
                                <Grid xs={6} md={5} justify="flex-end">
                                    <Popover isBordered={isDark ? true : false}>
                                        <Popover.Trigger>
                                            <Button
                                                auto
                                                flat
                                                icon={<FiShare />}
                                            />
                                        </Popover.Trigger>
                                        <Popover.Content>
                                            <Grid.Container gap={1}>
                                                <Grid xs={6} md={4}>
                                                    <Button
                                                        auto
                                                        rounded
                                                        light
                                                        color="primary"
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
                                                        color="primary"
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
                                                        color="primary"
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
