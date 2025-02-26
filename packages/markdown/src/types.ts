import { TokensList } from 'marked'

export interface CustomTokensList extends TokensList {
  foo?: string
}
export interface MarkdownNote {
  tokens: CustomTokensList
  created: string
  id: string
  modified: string
  tags: string[]
  title: string
}
