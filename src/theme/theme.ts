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
  },
})

export const lightTheme = createTheme(theme, {
  typography: {
    h1: {
      color: theme.palette.primary.main,
      fontSize: '22px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '20px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '19px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '18px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '17px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '16px',
      fontWeight: 600,
    },
  },
})
