import { createUseStyles } from 'react-jss'

import { margins } from '../theme/styles'
import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    card: {
      border: `1px solid ${theme.colors.slate[400]}`,
      borderRadius: spacing(theme, 2),
      padding: spacing(theme, 6),
    },
    root: {
      ...margins,
      marginBottom: spacing(theme, 2),
      marginTop: spacing(theme, 2),
    },
  })
)

export default styles
