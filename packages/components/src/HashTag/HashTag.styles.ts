import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>(
  (theme) => ({
    hashtag: {
      backgroundColor: theme.colors.slate[300],
      padding: spacing(theme, 1),
      borderRadius: theme.spacing,
      color: theme.colors.primary,
    },
    symbol: {
      color: theme.colors.slate[500],
    },
    content: {
      paddingLeft: spacing(theme, 1),
    },
  })
)

export default styles
