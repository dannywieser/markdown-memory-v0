import { ListProps } from './List.types'

export default function List({ ordered = false, children }: ListProps) {
  const List = ordered ? 'ol' : 'ul'
  return <List>{children}</List>
}
