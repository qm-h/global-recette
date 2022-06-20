import { NextUIProvider, getDocumentTheme } from '@nextui-org/react'
import { darkTheme, lightTheme } from './lib/theme/theme'
import { useEffect, useState } from 'react'

import App from './App'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

const AppProvider = () => (
    <NextThemesProvider
        defaultTheme="system"
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
