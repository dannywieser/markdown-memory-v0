import { createUseStyles } from 'react-jss'

import { margins } from '../theme/styles'
import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    const padding = spacing(theme, 2)
    return {
      root: {
        backgroundColor: theme.colors.primary,
        paddingTop: padding,
        paddingBottom: padding,
        position: 'sticky',
        top: 0,
        ...margins,
      },
      title: {
        color: theme.colors.contrastText,
      },
    }
  }
)

export default styles
