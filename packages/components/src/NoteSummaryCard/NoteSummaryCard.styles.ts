import { createUseStyles } from 'react-jss'

import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>({
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },
})

export default styles
