import { createUseStyles } from 'react-jss'

import { margins } from '../theme/styles'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>({
  root: {
    ...margins,
  },
})

export default styles
