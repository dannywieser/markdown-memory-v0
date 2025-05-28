import { createUseStyles } from 'react-jss'

import { MarkdownMemoryTheme } from '../theme/theme.types'

const IconHeight = 24

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    root: {
      ':visited': {
        color: theme.colors.primary,
      },
      color: theme.colors.primary,
      height: `${IconHeight}px`,
      width: `${IconHeight}px`,
    },
  })
)
export default styles
