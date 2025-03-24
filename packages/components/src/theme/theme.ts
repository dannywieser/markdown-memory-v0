import { MarkdownMemoryTheme } from './theme.types'

// TODO: figure out rgb
export const zinc900 = '#172439'
export const slate100 = '#F1F5F9'

export const spacing = (theme: MarkdownMemoryTheme, units: number) =>
  `${theme.spacing * units}px`

const bodyText = {
  fontSize: '20px',
}

export const theme: MarkdownMemoryTheme = {
  spacing: 4,
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
    code: {
      fontSize: '18px',
      fontWeight: 500,
    },
    em: bodyText,
    del: bodyText,
    strong: {
      fontSize: '20px',
      fontWeight: 900,
    },
    text: bodyText,
  },
}
