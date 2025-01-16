import type { TypographyVariantsOptions } from '@mui/material/styles'

export const typography: TypographyVariantsOptions = {
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
  h1: {
    fontSize: '1.75em',
    fontWeight: 700,
  },
  h2: {
    fontSize: '1.6em',
    fontWeight: 700,
  },
  h3: {
    fontSize: '1.5em',
    fontWeight: 700,
  },
  h4: {
    fontSize: '1.4em',
    fontWeight: 600,
  },
  h5: {
    fontSize: '1.2em',
    fontWeight: 600,
  },
  h6: {
    fontSize: '1em',
    fontWeight: 600,
  },
}
