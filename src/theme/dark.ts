import type { PaletteOptions } from '@mui/material/styles'

export const darkPalette: PaletteOptions = {
  background: {
    default: '#212121',
    paper: '#242424',
  },
  divider: 'rgba(0,0,0,0)',
  error: {
    contrastText: '#fff',
    main: '#ee2a1e',
  },
  info: {
    contrastText: '#fff',
    main: '#1890ff',
  },
  mode: 'dark',
  primary: {
    contrastText: '#fff',
    main: '#67be23',
  },
  secondary: {
    contrastText: '#fff',
    main: '#2A132E',
  },
  success: {
    contrastText: '#fff',
    main: '#67be23',
  },
  text: {
    disabled: '#d1d1d1',
    primary: '#fff',
    secondary: 'rgba(255,255,255,0.7)',
  },
  warning: {
    contrastText: '#fff',
    main: '#fa8c16',
  },
}
