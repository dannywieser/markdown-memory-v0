import { Tokens } from 'marked'

export interface ListItemProps {
  index: number
  item: Tokens.ListItem
  ordered?: boolean
}

export interface ListProps {
  items: Tokens.ListItem[]
  ordered?: boolean
}
