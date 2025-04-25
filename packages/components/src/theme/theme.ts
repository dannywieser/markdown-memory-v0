import { MarkdownMemoryTheme } from './theme.types'

// TODO: figure out rgb
export const zinc900 = '#172439'
export const slate100 = '#F1F5F9'

export const slate = {
  100: '#F1F5F9',
  200: '#e2e8f0',
  300: '#cbd5e1',
  400: '#94a3b8',
  500: '#64748b',
  600: '#475569',
  700: '#334155',
  800: '#0f172a',
  900: '#0f172a',
}

export const blue = {
  600: '#2563eb',
}

export const spacing = (theme: MarkdownMemoryTheme, units: number) =>
  `${theme.spacing * units}px`

const bodyText = {
  fontSize: '20px',
}

export const theme: MarkdownMemoryTheme = {
  colors: {
    black: '#000',
    blue,
    contrastText: '#fff',
    grey: slate100,
    primary: zinc900,
    slate,
  },
  fonts: {
    primary: 'Anonymous Pro',
  },
  spacing: 4,
  text: {
    code: bodyText,
    codespan: bodyText,
    del: bodyText,
    em: bodyText,
    escape: bodyText,
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
    lineHeight: 1.4,
    strong: {
      ...bodyText,
      fontWeight: 900,
    },
    text: bodyText,
  },
}
