import styled from '@emotion/styled'
import { Tokens } from 'marked'

import { ListProps } from './List.types'
import ListItem from './ListItem'

export default function List({ ordered = false, items }: ListProps) {
  const tag = ordered ? 'ol' : 'ul'
  const ListTag = styled[tag]`
    list-style-type: none;
    padding-inline-start: 0;
    margin: 0;
  `

  return (
    <ListTag>
      {items.map((item: Tokens.ListItem) => (
        <ListItem item={item} />
      ))}
    </ListTag>
  )
}
