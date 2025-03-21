import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'
import { TextProps, TextVariant } from './Text.types'

const styles = createUseStyles<string, TextProps, MarkdownMemoryTheme>(
  (theme) => {
    const base = {
      whiteSpace: 'pre-line',
      fontFamily: theme.fonts.primary,
      lineHeight: theme.text.lineHeight,
      margin: 0,
    }

    const variantStyle = (variant: TextVariant) => ({
      marginTop: spacing(theme.spacing * 1.5),
      marginBottom: spacing(theme.spacing * 1.5),
      fontSize: theme.text[variant].fontSize,
      fontWeight: theme.text[variant].fontWeight,
    })

    return {
      base,
      h1: variantStyle('h1'),
      h2: variantStyle('h2'),
      h3: variantStyle('h3'),
      h4: variantStyle('h4'),
      h5: variantStyle('h5'),
      h6: variantStyle('h6'),
      em: variantStyle('em'),
      del: variantStyle('em'),
      strong: variantStyle('em'),
      text: variantStyle('text'),
    }
  }
)

export default styles
