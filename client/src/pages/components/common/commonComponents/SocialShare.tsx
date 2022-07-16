import { FaFacebookF, FaTwitter } from 'react-icons/fa'
import { ImLinkedin2 } from 'react-icons/im'
import { Button, Grid } from '@nextui-org/react'
import { Recipe } from '../../../../../../server/src/shared/types'

interface SocialShareProps {
    recipe: Recipe
    isDark: boolean
}

const SocialShare = ({ recipe, isDark }: SocialShareProps) => {
    const href = window.location.href
    const shareUrl = `${href}recette/${recipe.id}`

    const handleTwitterShare = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${shareUrl}`
        window.open(twitterUrl, '_blank')
    }

    const handleFacebookShare = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`
        window.open(facebookUrl, '_blank')
    }

    const handleLinkedInShare = () => {
        const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`
        window.open(linkedinUrl, '_blank')
    }

    return (
        <Grid.Container
            justify={'space-around'}
            alignItems={'center'}
            alignContent={'center'}
        >
            <Button.Group
                flat={isDark}
                color={isDark ? 'success' : 'default'}
                animated={!isDark}
            >
                <Button
                    auto
                    size={'sm'}
                    css={{
                        p: '$5',
                    }}
                    onClick={handleFacebookShare}
                >
                    <FaFacebookF size={15} />
                </Button>
                <Button
                    auto
                    size={'sm'}
                    css={{
                        p: '$5',
                    }}
                    onClick={handleTwitterShare}
                >
                    <FaTwitter size={15} onClick={() => handleTwitterShare} />
                </Button>
                <Button
                    auto
                    size={'sm'}
                    css={{
                        p: '$5',
                    }}
                    onClick={handleLinkedInShare}
                >
                    <ImLinkedin2
                        onClick={() => handleLinkedInShare}
                        size={15}
                    />
                </Button>
            </Button.Group>
        </Grid.Container>
    )
}

export default SocialShare
