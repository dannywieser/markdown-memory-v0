import { createTheme } from '@mui/material/styles'

import { lightPalette } from './light'

const theme = createTheme({
  palette: lightPalette,
  typography: {
    fontFamily: [
      'Anonymous Pro',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 18,
  },
})

export const lightTheme = createTheme(theme, {
  typography: {
    h1: {
      color: theme.palette.primary.main,
      fontSize: '24px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '22px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '18px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '18px',
      fontWeight: 600,
    },
  },
})
