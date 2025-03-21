import { Tokens } from 'marked'

import { ListProps } from './List.types'
import ListItem from './ListItem'

export default function List({ ordered = false, items }: ListProps) {
  const Tag = ordered ? 'ol' : 'ul'
  // const ListTag = styled[tag]`
  //   list-style-type: none;
  //   padding-inline-start: 0;
  //   margin: 0;
  // `

  return (
    <Tag>
      {items.map((item: Tokens.ListItem) => (
        <ListItem item={item} />
      ))}
    </Tag>
  )
}
