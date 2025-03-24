import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    return {
      root: {
        whiteSpace: 'pre-line',
        backgroundColor: theme.colors.grey,
        borderLeft: `${spacing(theme, 2)} solid`,
        borderLeftColor: theme.colors.primary,
        margin: 0,
        marginTop: spacing(theme, 2),
        paddingLeft: spacing(theme, 4),
      },
    }
  }
)

export default styles
