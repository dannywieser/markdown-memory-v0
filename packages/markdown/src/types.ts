import { TokensList } from 'marked'

export interface CustomTokensList extends TokensList {
  foo?: string
}

export interface MarkdownNote {
  created: Date
  externalUrl: string
  filePaths: string[]
  id: string
  modified: Date
  source: MarkdownNoteSource
  tags: string[]
  title: string
  tokens: CustomTokensList
}
export type MarkdownNoteSource = 'bear' | 'file'
