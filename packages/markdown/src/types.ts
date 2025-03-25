import { TokensList } from 'marked'

export interface CustomTokensList extends TokensList {
  foo?: string
}

export type MarkdownNoteSource = 'bear' | 'file'
export interface MarkdownNote {
  tokens: CustomTokensList
  created: Date
  id: string
  modified: Date
  tags: string[]
  title: string
  source: MarkdownNoteSource
  externalUrl: string
}
