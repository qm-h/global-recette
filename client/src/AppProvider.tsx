import { darkTheme, lightTheme } from './lib/theme/theme'

import App from './App'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { NextUIProvider } from '@nextui-org/react'

const AppProvider = () => (
    <NextThemesProvider
        attribute="class"
        value={{
            light: lightTheme.className,
            dark: darkTheme.className,
        }}
    >
        <NextUIProvider>
            <App />
        </NextUIProvider>
    </NextThemesProvider>
)

export default AppProvider
