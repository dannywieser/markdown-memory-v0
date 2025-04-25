import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'
export const IconSize = 24
const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>((data) => {
  return {
    bulletOrdered: {},
    bulletUnordered: {
      paddingTop: spacing(data, 1),
    },
    list: {
      listStyleType: 'none',
      margin: 0,
      paddingInlineStart: 0,
    },
    listitem: {
      display: 'grid',
      gridTemplateColumns: `${IconSize + data.spacing * 3}px 1fr`,
    },
  }
})

export default styles
