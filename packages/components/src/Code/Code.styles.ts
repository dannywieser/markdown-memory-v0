import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    return {
      pre: {
        backgroundColor: theme.colors.grey,
        margin: 0,
        padding: spacing(theme, 2),
      },
    }
  }
)

export default styles
