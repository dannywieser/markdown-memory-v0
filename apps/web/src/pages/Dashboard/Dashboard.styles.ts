import { spacing } from '@markdown-memory/components'
import { MarkdownMemoryTheme } from 'packages/components/src/theme/theme.types'
import { createUseStyles } from 'react-jss'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    layout: {
      '@media (min-width: 900px)': {
        gridTemplateColumns: '1fr 1fr',
      },
      display: 'grid',
      gap: spacing(theme, 1),
      gridTemplateColumns: '100%',
      margin: spacing(theme, 1),
    },
  })
)

export default styles
