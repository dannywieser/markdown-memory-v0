import { Tokens } from 'marked'

import useStyles from './List.styles'
import { ListProps } from './List.types'
import ListItem from './ListItem'

export default function List({ ordered = false, items }: ListProps) {
  const { list } = useStyles()
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={list}>
      {items.map((item: Tokens.ListItem, index: number) => (
        <ListItem
          key={`item-${index}`}
          item={item}
          ordered={ordered}
          index={index}
        />
      ))}
    </Tag>
  )
}
