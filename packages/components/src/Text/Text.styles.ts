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

    const codespan = () => ({
      backgroundColor: theme.colors.grey,
      padding: spacing(theme, 1),
      borderRadius: theme.spacing,
      ...variantStyle('codespan'),
    })

    const hashtag = () => ({
      backgroundColor: theme.colors.slate[300],
      padding: spacing(theme, 1),
      borderRadius: theme.spacing,
      color: theme.colors.primary,
    })

    const headingStyle = (variant: TextVariant) => ({
      marginTop: spacing(theme, 1.5),
      marginBottom: spacing(theme, 1.5),
      ...variantStyle(variant),
    })

    const variantStyle = (variant: TextVariant) => ({
      fontSize: theme.text[variant].fontSize,
      fontWeight: theme.text[variant].fontWeight,
    })

    return {
      base,
      code: variantStyle('code'),
      codespan: codespan(),
      hashtag,
      h1: headingStyle('h1'),
      h2: headingStyle('h2'),
      h3: headingStyle('h3'),
      h4: headingStyle('h4'),
      h5: headingStyle('h5'),
      h6: headingStyle('h6'),
      em: variantStyle('em'),
      del: variantStyle('em'),
      strong: variantStyle('strong'),
      text: variantStyle('text'),
    }
  }
)

export default styles
