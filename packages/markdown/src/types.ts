import { TokensList } from 'marked'

export interface CustomTokensList extends TokensList {
  foo?: string
}
export interface MarkdownNote {
  tokens: CustomTokensList
  created: Date
  id: string
  modified: Date
  tags: string[]
  title: string
  source: 'bear' | 'file'
  externalUrl: string
}
