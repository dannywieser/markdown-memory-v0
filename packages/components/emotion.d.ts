declare module '@emotion/react' {
  export interface TextTheme {
    fontSize: string
    fontWeight: number
  }
  export interface Theme {
    grid: number
    colors: {
      primary: string
      grey: string
      contrastText: string
    }
    fonts: {
      primary: string
    }
    text: {
      lineHeight: number
      h1: TextTheme
      h2: TextTheme
      h3: TextTheme
      h4: TextTheme
      h5: TextTheme
      h6: TextTheme
      body: TextTheme
      strong: TextTheme
      code: TextTheme
    }
  }
}
