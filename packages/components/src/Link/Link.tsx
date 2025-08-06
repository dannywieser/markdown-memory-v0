import Text from '../Text/Text'
import { LinkProps } from './Link.types'

export default function Link({ children, href }: LinkProps) {
  return (
    <a href={href}>
      <Text>{children}</Text>
    </a>
  )
}
