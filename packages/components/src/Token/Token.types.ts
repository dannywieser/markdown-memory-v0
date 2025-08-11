import { MarkdownNote } from '@markdown-memory/markdown'
import { Token } from 'marked'

export interface TokensProps {
  note?: MarkdownNote
  searchTerm?: string
  tokens?: Token[]
}
