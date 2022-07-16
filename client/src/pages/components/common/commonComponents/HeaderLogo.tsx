import { Text } from '@nextui-org/react'
import burgerLogo from '../../../../utils/images/assets/burger-logo.png'
import { NavigateFunction } from 'react-router-dom'

interface HeaderLogoProps {
    navigate: NavigateFunction
    isMobile: boolean
}

const HeaderLogo = ({ navigate, isMobile }: HeaderLogoProps) => {
    return (
        <>
            <Text
                h3={isMobile}
                h2={!isMobile}
                b
                css={{
                    cursor: 'pointer',
                    textGradient: '45deg, $yellow600 20%, $green600 50%',
                    m: '$0',
                    p: '$0',
                }}
                onClick={() => navigate('/')}
            >
                Global
            </Text>
            <Text
                h3={isMobile}
                h2={!isMobile}
                onClick={() => navigate('/')}
                b
                css={{
                    cursor: 'pointer',
                    textGradient: '45deg, $green600 20%, $yellow600 100%',
                    m: '$0',
                    p: '$0',
                }}
            >
                Recette
                <img
                    onClick={() => navigate('/')}
                    src={burgerLogo}
                    width={isMobile ? '25rem' : '50rem'}
                    alt="Burger logo"
                />
            </Text>
        </>
    )
}

export default HeaderLogo
