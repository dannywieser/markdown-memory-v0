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
    fontSize: '16px',
    fontWeight: 700,
  },
  h2: {
    fontSize: '14px',
    fontWeight: 700,
  },
  h3: {
    fontSize: '13px',
    fontWeight: 700,
  },
  h4: {
    fontSize: '12px',
    fontWeight: 600,
  },
  h5: {
    fontSize: '12px',
    fontWeight: 600,
  },
  h6: {
    fontSize: '12px',
    fontWeight: 600,
  },
}
