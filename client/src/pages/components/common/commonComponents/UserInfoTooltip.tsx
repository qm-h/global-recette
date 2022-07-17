import {
    Avatar,
    Button,
    Col,
    Grid,
    Loading,
    Row,
    Spacer,
    Text,
} from '@nextui-org/react'

import { SuccessAuthUser } from '../../../../../../server/src/shared/types'
import { getFollowingUser } from '../../../../router/userRouter'
import { getRecipeUser } from '../../../../router/recipesRouter'
import { useAppContext } from '../../../../utils/context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'

interface UserInfoTooltipProps {
    userRecipe: SuccessAuthUser
    handleFollowingUser: (userID: number, followerID: number) => void
    isLoading: boolean
    handleUnfollowingUser: (userID: number, followerID: number) => void
    isFollowing: boolean
    isUnfollowing: boolean
    isMobile: boolean
}

const UserInfoTooltip = ({
    userRecipe,
    handleFollowingUser,
    isLoading,
    handleUnfollowingUser,
    isFollowing,
    isUnfollowing,
    isMobile,
}: UserInfoTooltipProps) => {
    const { user } = useAppContext()
    const [followingUser, setFollowingUser] = useState<number>()
    const [recipeUser, setRecipeUser] = useState<SuccessAuthUser>()

    useEffect(() => {
        console.log('isFollowing:', isFollowing)
        console.log('isUnfollowing:', isUnfollowing)
        if (user) {
            getFollowingUser(user.username).then((res) => {
                setFollowingUser(res.data[0].user_to_follow)
                console.log('followingUser', followingUser)
            })
        }
        Promise.all([getRecipeUser(userRecipe.id)]).then(([recipeUser]) => {
            console.log('recipeUser', recipeUser)
            if (recipeUser) {
                setRecipeUser(recipeUser)
                console.log('recipeUser', recipeUser)
            }
        })
    }, [followingUser, isFollowing, isUnfollowing, user, userRecipe.id])

    return (
        <Grid.Container
            className="user-twitter-card__container"
            css={{
                mw: '300px',
                borderRadius: '$lg',
                padding: isMobile ? '$0' : '$sm',
            }}
        >
            {!recipeUser ? (
                <Loading />
            ) : (
                <>
                    <Row justify="space-between" align="center">
                        <Col span={3}>
                            <Avatar
                                bordered
                                borderWeight="normal"
                                color="success"
                                pointer
                                size={isMobile ? 'md' : 'lg'}
                                src={userRecipe.generated_avatar}
                            />
                        </Col>
                        <Col span={9}>
                            <Row>
                                <Grid xs={12} md={12} direction="column">
                                    <Text
                                        className="user-twitter-card__text"
                                        b
                                        size={isMobile ? 12 : 15}
                                    >
                                        {recipeUser.firstname}
                                    </Text>
                                    <Text
                                        className="user-twitter-card__text"
                                        size={isMobile ? 12 : 14}
                                        css={{ mt: '-$3' }}
                                        color="#888888"
                                    >
                                        @{recipeUser.username}
                                    </Text>
                                </Grid>
                                {!user ||
                                (user && user.id === userRecipe.id) ? (
                                    <></>
                                ) : followingUser &&
                                  followingUser === userRecipe.id ? (
                                    <Button
                                        auto
                                        size={isMobile ? 'xs' : 'sm'}
                                        onClick={() =>
                                            handleUnfollowingUser(
                                                userRecipe.id,
                                                user.id
                                            )
                                        }
                                        css={{
                                            ml: isMobile ? '$5' : '',
                                        }}
                                        color="success"
                                        flat={!isMobile}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loading type="points" size="sm" />
                                        ) : (
                                            'Unfollow'
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        auto
                                        css={{
                                            ml: isMobile ? '$5' : '',
                                        }}
                                        size={isMobile ? 'xs' : 'sm'}
                                        onClick={() =>
                                            handleFollowingUser(
                                                userRecipe.id,
                                                user.id
                                            )
                                        }
                                        color="success"
                                        flat={!isMobile}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <Loading type="points" size="sm" />
                                        ) : (
                                            'Follow'
                                        )}
                                    </Button>
                                )}
                            </Row>
                        </Col>
                    </Row>
                    <Grid.Container className="user-twitter-card__username-container">
                        <Grid xs={12}>
                            <Text
                                className="user-twitter-card__text"
                                size={14}
                                css={{ mt: '$1' }}
                                color="#888888"
                            >
                                {recipeUser.biography}
                            </Text>
                        </Grid>
                    </Grid.Container>
                    <Grid.Container
                        className="user-twitter-card__metrics-container"
                        justify="flex-start"
                        alignContent="center"
                    >
                        <Text
                            className="user-twitter-card__text"
                            size={14}
                            color="#888888"
                        >
                            <Text
                                b
                                color="foreground"
                                className="user-twitter-card__text"
                                size={14}
                                css={{ mr: '$1' }}
                            >
                                {recipeUser.following}
                            </Text>
                            Following
                        </Text>
                        <Spacer inline x={0.5} />
                        <Text
                            className="user-twitter-card__text"
                            size={14}
                            color="#888888"
                        >
                            <Text
                                b
                                color="foreground"
                                className="user-twitter-card__text"
                                size={14}
                                css={{ mr: '$1' }}
                            >
                                {recipeUser.followers}
                            </Text>
                            Followers
                        </Text>
                    </Grid.Container>
                </>
            )}
        </Grid.Container>
    )
}

export default UserInfoTooltip
