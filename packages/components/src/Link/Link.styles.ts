import { createUseStyles } from 'react-jss'

import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    root: {
      ':visited': {
        color: theme.colors.primary,
      },
      color: theme.colors.primary,
    },
  })
)

export default styles
