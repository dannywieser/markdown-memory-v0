import { createUseStyles } from 'react-jss'

import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    external: {
      ':visited': {
        color: theme.colors.primary,
      },
      color: theme.colors.primary,
    },
    internal: {
      ':visited': {
        color: theme.colors.blue[600],
      },
      backgroundColor: theme.colors.slate[200],
      color: theme.colors.blue[600],
      textDecoration: 'none',
    },
  })
)

export default styles
