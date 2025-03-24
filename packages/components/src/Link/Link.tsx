import Text from '../Text/Text'
import useStyles from './Link.styles'
import { LinkProps } from './Link.types'

export default function Link({ href, children }: LinkProps) {
  const { root } = useStyles()
  return (
    <a href={href} className={root}>
      <Text>{children}</Text>
    </a>
  )
}
