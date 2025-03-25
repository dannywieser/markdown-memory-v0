import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => ({
    mainHeading: {
      backgroundColor: theme.colors.primary,
      color: theme.colors.contrastText,
      lineHeight: `${theme.text.lineHeight}em`,
      paddingLeft: spacing(theme, 2),
      display: 'grid',
      gridTemplateColumns: '1fr 10%',
      gap: spacing(theme, 1),
      marginBottom: spacing(theme, 1),
    },
    headingTools: {
      display: 'flex',
      lineHeight: `${theme.text.lineHeight}em`,
      padding: spacing(theme, 2),
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'end',
    },
  })
)
export default styles
