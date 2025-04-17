import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>(
  (theme) => ({
    imageContainer: {
      display: 'grid',
      height: '100%',
    },
    centerFit: {
      maxWidth: '100%',
      maxHeight: '100vh',
      margin: 'auto',
    },
  })
)

export default styles
