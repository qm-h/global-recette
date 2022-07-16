import { Card, Grid, Switch, Text } from '@nextui-org/react'

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
                    {isDark ? 'Nuit' : 'Jour'}
                </Text>
            </Grid>
            <Grid
                md={12}
                css={{
                    padding: '$10',
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
                    iconOff={
                        <SunIcon
                            filled
                            size={undefined}
                            height={undefined}
                            width={undefined}
                            label={undefined}
                        />
                    }
                    iconOn={
                        <MoonIcon
                            filled
                            size={undefined}
                            height={undefined}
                            width={undefined}
                            label={undefined}
                        />
                    }
                />
            </Grid>
        </Card>
    )
}

export default ThemeSwitch
