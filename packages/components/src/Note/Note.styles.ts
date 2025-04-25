import { createUseStyles } from 'react-jss'

import { margins } from '../theme/styles'
import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    root: {
      ...margins,
      marginBottom: spacing(theme, 2),
    },
  })
)

export default styles
