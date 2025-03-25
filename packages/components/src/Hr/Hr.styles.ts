import { createUseStyles } from 'react-jss'

import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>(
  (theme) => ({
    hr: {
      color: theme.colors.primary,
    },
  })
)

export default styles
