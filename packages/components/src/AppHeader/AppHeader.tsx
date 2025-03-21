import Text from '../Text/Text'
import useStyles from './AppHeader.styles'
import { HeaderProps } from './AppHeader.types'

export default function AppHeader({ title }: HeaderProps) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Text className={classes.title} variant="h1">
        {title}
      </Text>
    </div>
  )
}
