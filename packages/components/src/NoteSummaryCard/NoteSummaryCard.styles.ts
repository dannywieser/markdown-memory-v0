import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    return {
      list: {
        listStyleType: 'none',
        margin: 0,
        padding: 0,
      },
      listitem: {
        paddingBottom: spacing(theme, 1.5),
      },
    }
  }
)

export default styles
