import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

export const imageHeight = 75

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    const border = `2px solid ${theme.colors.slate[600]}`
    return {
      image: {
        border,
        borderRadius: spacing(theme, 2),
        height: `${imageHeight}px`,
        overflow: 'hidden',
      },
      imageStack: {
        borderTop: `1px solid ${theme.colors.slate[200]}`,
        display: 'grid',
        gap: spacing(theme, 2),
        gridTemplateColumns: 'repeat( auto-fit, minmax(20px, 75px) )',
        overflow: 'hidden',
        paddingTop: spacing(theme, 2),
      },
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
