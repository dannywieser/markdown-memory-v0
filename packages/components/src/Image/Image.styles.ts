import { createUseStyles } from 'react-jss'

import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, unknown, MarkdownMemoryTheme>(
  (theme) => ({
    centerFit: {
      margin: 'auto',
      maxHeight: '100vh',
      maxWidth: '100%',
    },
    imageContainer: {
      display: 'grid',
      height: '100%',
    },
  })
)

export default styles
