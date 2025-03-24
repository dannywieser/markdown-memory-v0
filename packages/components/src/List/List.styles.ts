import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'
export const IconSize = 24
const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>((data) => {
  return {
    list: {
      margin: 0,
      paddingInlineStart: 0,
      listStyleType: 'none',
    },
    listitem: {
      display: 'grid',
      gridTemplateColumns: `${IconSize + data.spacing * 3}px 1fr`,
    },
    bulletUnordered: {
      paddingTop: spacing(data, 1),
    },
    bulletOrdered: {},
  }
})

export default styles
