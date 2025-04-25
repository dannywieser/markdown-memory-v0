import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>(
  (theme) => ({
    content: {
      paddingLeft: spacing(theme, 1),
    },
    hashtag: {
      backgroundColor: theme.colors.slate[300],
      borderRadius: theme.spacing,
      color: theme.colors.primary,
      padding: spacing(theme, 1),
    },
    symbol: {
      color: theme.colors.slate[500],
    },
  })
)

export default styles
