import Text from '../Text/Text'
import useStyles from './Link.styles'
import { LinkProps } from './Link.types'

export default function Link({ children, href }: LinkProps) {
  const { external, internal } = useStyles()
  const style = href.includes('/note') ? internal : external
  return (
    <a className={style} href={href}>
      <Text>{children}</Text>
    </a>
  )
}
