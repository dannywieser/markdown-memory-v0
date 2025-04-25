import Text from '../Text/Text'
import useStyles from './Link.styles'
import { LinkProps } from './Link.types'

export default function Link({ children, href }: LinkProps) {
  const { root } = useStyles()
  return (
    <a className={root} href={href}>
      <Text>{children}</Text>
    </a>
  )
}
