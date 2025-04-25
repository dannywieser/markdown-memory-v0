import { Tokens } from 'marked'

import useStyles from './List.styles'
import { ListProps } from './List.types'
import ListItem from './ListItem'

export default function List({ items, ordered = false }: ListProps) {
  const { list } = useStyles()
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={list}>
      {items.map((item: Tokens.ListItem, index: number) => (
        <ListItem
          index={index}
          item={item}
          key={`item-${index}`}
          ordered={ordered}
        />
      ))}
    </Tag>
  )
}
