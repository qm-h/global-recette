import { createTheme } from '@nextui-org/react'

export const lightTheme = createTheme({
    type: 'light',
    theme: {
        colors: {
            primary: '#19C964',
            secondary: '#0070f3',
            default: '##F0F3F5',
        },
    },
})

export const darkTheme = createTheme({
    type: 'dark',
    theme: {
        colors: {
            primary: '#19C964',
            secondary: '#0070f3',
            background: '#0f0f0f',
            default: '#F0F3F5',
        },
    },
})
