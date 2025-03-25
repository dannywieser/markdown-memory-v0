export interface ColorGradient {
  100: string
  200: string
  300: string
  400: string
  500: string
  600: string
  700: string
  800: string
  900: string
}
export interface ThemeColors {
  primary: string
  grey: string
  slate: ColorGradient
  contrastText: string
  black: string
}

export interface ThemeFonts {
  primary: string
}

export interface ThemeText {
  lineHeight: number
  h1: ThemeTextVariant
  h2: ThemeTextVariant
  h3: ThemeTextVariant
  h4: ThemeTextVariant
  h5: ThemeTextVariant
  h6: ThemeTextVariant
  strong: ThemeTextVariant
  code: ThemeTextVariant
  codespan: ThemeTextVariant
  del: ThemeTextVariant
  em: ThemeTextVariant
  text: ThemeTextVariant
}

export interface ThemeTextVariant {
  fontSize: string
  fontWeight?: number
}

export interface MarkdownMemoryTheme {
  spacing: number
  colors: ThemeColors
  fonts: ThemeFonts
  text: ThemeText
}
