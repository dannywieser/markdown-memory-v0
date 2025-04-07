import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    const cardBase = {
      border: `1px solid ${theme.colors.slate[400]}`,
    }

    return {
      cardBase,
      cardLink: {
        ...cardBase,
        '&:hover': {
          backgroundColor: theme.colors.slate[100],
        },
      },
      link: {
        textDecoration: 'none',
        color: theme.colors.primary,
      },
      content: {
        padding: spacing(theme, 2),
      },
      header: {
        backgroundColor: theme.colors.primary,
        color: theme.colors.contrastText,
        margin: 0,
        padding: spacing(theme, 2),
      },
    }
  }
)

export default styles
