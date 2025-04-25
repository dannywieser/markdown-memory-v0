import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    headingTools: {
      alignItems: 'end',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      lineHeight: `${theme.text.lineHeight}em`,
      padding: spacing(theme, 2),
    },
    mainHeading: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.contrastText,
      display: 'grid',
      gap: spacing(theme, 1),
      gridTemplateColumns: '1fr 10%',
      lineHeight: `${theme.text.lineHeight}em`,
      marginBottom: spacing(theme, 1),
      paddingLeft: spacing(theme, 2),
    },
  })
)
export default styles
