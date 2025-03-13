import { Tokens } from 'marked'

export interface ListProps {
  ordered?: boolean
  items: Tokens.ListItem[]
}

export interface ListItemProps {
  item: Tokens.ListItem
}
