'use client'

import { ChakraProvider, createSystem, defaultConfig } from '@chakra-ui/react'

import { ColorModeProvider, type ColorModeProviderProps } from './color-mode'

import '@fontsource/anonymous-pro'

export const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        primary: { value: '#27272a' },
        secondary: { value: '#173da6' },
      },
      fonts: {
        body: { value: 'Anonymous Pro' },
        heading: { value: 'Anonymous Pro' },
      },
    },
  },
})

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
