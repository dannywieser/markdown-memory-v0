import Text from '../Text/Text'
import { ListProps } from './List.types'

// TODO: styling
export default function ListItem({ children }: ListProps) {
  return (
    <li>
      <Text variant="body">{children}</Text>
    </li>
  )
}
