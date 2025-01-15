import type { ThemeOptions } from '@mui/material/styles'

import { createTheme } from '@mui/material/styles'

import { lightPalette } from './light'
import * as components from './overrides'
import { typography } from './typography'

const commonThemeProperties: ThemeOptions = {
  typography: {
    ...typography,
  },
}

export const lightTheme = createTheme({
  ...commonThemeProperties,
  components,
  palette: lightPalette,
})
