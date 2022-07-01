// 1. Import `createTheme`
import { createTheme } from '@nextui-org/react'

// 2. Call `createTheme` and pass your custom values
export const lightTheme = createTheme({
    type: 'light',
    theme: {
        colors: {
            primary: '#0070f3',
            secondary: '#F5B453',
        },
    },
})

export const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            primary: '#0070f3',
            secondary: '#F5B453',
            background: '#0f0f0f',
        },
    },
})
