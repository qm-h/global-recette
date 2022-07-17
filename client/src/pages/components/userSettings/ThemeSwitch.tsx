import { Card, Grid, Switch, Text } from '@nextui-org/react'
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'

import MoonIcon from '../../../utils/theme/Icons/MoonIcon'
import SunIcon from '../../../utils/theme/Icons/SunIcon'

const ThemeSwitch = ({ isDark, setTheme, isMobile }) => {
    return (
        <Card
            css={{
                width: isMobile ? '50%' : '100%',
                height: '100%',
                padding: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            variant={isMobile ? 'flat' : 'shadow'}
        >
            <Grid md={12}>
                <Text css={{ textAlign: 'center' }}>
                    Thème {isDark ? 'Sombre' : 'Clair'}
                </Text>
            </Grid>
            <Grid
                md={12}
                css={{
                    padding: isMobile ? '$10' : '$11',
                }}
                alignContent="center"
                justify="center"
                alignItems="center"
            >
                <Switch
                    checked={isDark}
                    color="success"
                    onChange={(e) =>
                        setTheme(e.target.checked ? 'dark' : 'light')
                    }
                    size="xl"
                    iconOff={<RiSunFill color="#c9c9c9" />}
                    iconOn={<RiMoonClearFill color={'#40EC8B'} />}
                />
            </Grid>
        </Card>
    )
}

export default ThemeSwitch
