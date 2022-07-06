import { Avatar, Button, Col, Grid, Row, Spacer, Text } from '@nextui-org/react'

import React from 'react'
import { User } from '../../../../../../server/src/shared/types'
import { useAppContext } from '../../../../utils/context/AppContext'

interface UserInfoTooltipProps {
    userRecipe: User
    onClick: () => void
}

const UserInfoTooltip = ({ userRecipe, onClick }: UserInfoTooltipProps) => {
    const [following, setFollowing] = React.useState(false)
    const { user } = useAppContext()
    return (
        <Grid.Container
            className="user-twitter-card__container"
            css={{
                mw: '300px',
                borderRadius: '$lg',
                padding: '$sm',
            }}
            onClick={onClick}
        >
            <Row justify="space-between" align="center">
                <Col span={3}>
                    <Avatar size="lg" src={userRecipe.avatar} />
                </Col>
                <Col span={9}>
                    <Row>
                        <Grid xs={12} direction="column">
                            <Text
                                className="user-twitter-card__text"
                                b
                                size={15}
                            >
                                {userRecipe.firstname} {userRecipe.lastname}
                            </Text>
                            <Text
                                className="user-twitter-card__text"
                                size={14}
                                css={{ mt: '-$3' }}
                                color="#888888"
                            >
                                @{userRecipe.username}
                            </Text>
                        </Grid>
                        {user && user.id === userRecipe.id ? (
                            <></>
                        ) : (
                            <Button
                                auto
                                size="sm"
                                onClick={() => setFollowing(!following)}
                                color="success"
                                flat
                            >
                                {following ? 'Unfollow' : 'Follow'}
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
                        Full-stack developer, @getnextui lover she/her 🎉
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
                        4
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
                        97.1K
                    </Text>
                    Followers
                </Text>
            </Grid.Container>
        </Grid.Container>
    )
}

export default UserInfoTooltip
