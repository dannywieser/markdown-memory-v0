import { Theme } from '@emotion/react'

// TODO: figure out rgb
const zinc900 = '#172439'
const slate100 = '#F1F5F9'

export const theme: Theme = {
  grid: 4,
  colors: {
    primary: zinc900,
    grey: slate100,
    contrastText: '#fff',
  },
  fonts: {
    primary: 'Anonymous Pro',
  },
  text: {
    lineHeight: 1.4,
    h1: {
      fontSize: '26px',
      fontWeight: 800,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '22px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h5: {
      fontSize: '20px',
      fontWeight: 600,
    },
    h6: {
      fontSize: '20px',
      fontWeight: 600,
    },
    body: {
      fontSize: '20px',
      fontWeight: 500,
    },
    code: {
      fontSize: '18px',
      fontWeight: 500,
    },
    strong: {
      fontSize: '20px',
      fontWeight: 900,
    },
  },
}
