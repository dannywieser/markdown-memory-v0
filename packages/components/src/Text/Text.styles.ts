import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'
import { TextProps, TextVariant } from './Text.types'

const styles = createUseStyles<string, TextProps, MarkdownMemoryTheme>(
  (theme) => {
    const base = {
      fontFamily: theme.fonts.primary,
      lineHeight: theme.text.lineHeight,
      margin: 0,
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
    }

    const codespan = () => ({
      backgroundColor: theme.colors.grey,
      borderRadius: theme.spacing,
      padding: spacing(theme, 1),
      ...variantStyle('codespan'),
    })

    const headingStyle = (variant: TextVariant) => ({
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
      del: variantStyle('em'),
      em: variantStyle('em'),
      h1: headingStyle('h1'),
      h2: headingStyle('h2'),
      h3: headingStyle('h3'),
      h4: headingStyle('h4'),
      h5: headingStyle('h5'),
      h6: headingStyle('h6'),
      strong: variantStyle('strong'),
      text: variantStyle('text'),
    }
  }
)

export default styles
