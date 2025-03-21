export interface ThemeColors {
  primary: string
  grey: string
  contrastText: string
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
  body: ThemeTextVariant
  strong: ThemeTextVariant
  code: ThemeTextVariant
}

export interface ThemeTextVariant {
  fontSize: string
  fontWeight: number
}

export interface MarkdownMemoryTheme {
  spacing: number
  colors: ThemeColors
  fonts: ThemeFonts
  text: ThemeText
}
