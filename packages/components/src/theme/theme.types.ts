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
export interface MarkdownMemoryTheme {
  colors: ThemeColors
  fonts: ThemeFonts
  spacing: number
  text: ThemeText
}

export interface ThemeColors {
  black: string
  contrastText: string
  grey: string
  primary: string
  slate: ColorGradient
}

export interface ThemeFonts {
  primary: string
}

export interface ThemeText {
  code: ThemeTextVariant
  codespan: ThemeTextVariant
  del: ThemeTextVariant
  em: ThemeTextVariant
  escape: ThemeTextVariant
  h1: ThemeTextVariant
  h2: ThemeTextVariant
  h3: ThemeTextVariant
  h4: ThemeTextVariant
  h5: ThemeTextVariant
  h6: ThemeTextVariant
  lineHeight: number
  strong: ThemeTextVariant
  text: ThemeTextVariant
}

export interface ThemeTextVariant {
  fontSize: string
  fontWeight?: number
}
