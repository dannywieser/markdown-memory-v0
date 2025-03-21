import Text from '../Text/Text'
import { LinkProps } from './Link.types'

// const StyledLink = styled.a`
//   color: ${(props) => props.theme.colors.primary};
//   :visited: {
//     color: ${(props) => props.theme.colors.primary};
//   }
// `

export default function Link({ href, children }: LinkProps) {
  return (
    <a href={href}>
      <Text>{children}</Text>
    </a>
  )
}
