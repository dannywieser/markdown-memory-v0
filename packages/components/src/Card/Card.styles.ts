import { createUseStyles } from 'react-jss'

import { spacing } from '../theme/theme'
import { MarkdownMemoryTheme } from '../theme/theme.types'

const styles = createUseStyles<string, undefined, MarkdownMemoryTheme>(
  (theme) => {
    const cardBase = {
      border: `1px solid ${theme.colors.slate[400]}`,
      borderRadius: spacing(theme, 2),
      padding: spacing(theme, 6),
    }

    return {
      cardBase,
      cardLink: {
        ...cardBase,
        '&:hover': {
          backgroundColor: theme.colors.slate[100],
        },
      },
      content: {},
      header: {
        display: 'grid',
        fontWeight: 'bold',
        gap: spacing(theme, 1),
        gridTemplateColumns: '1fr 10%',
        lineHeight: `${theme.text.lineHeight}em`,
        marginBottom: spacing(theme, 1),
      },
      headerIcon: {
        alignItems: 'end',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        lineHeight: `${theme.text.lineHeight}em`,
        padding: spacing(theme, 2),
      },
      link: {
        color: theme.colors.primary,
        textDecoration: 'none',
      },
    }
  }
)

export default styles
