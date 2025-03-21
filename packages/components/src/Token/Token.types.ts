import { MarkdownNote } from '@markdown-memory/markdown'
import { Token } from 'marked'

export interface TokenProps {
  token: Token
  note?: MarkdownNote
}

export interface TokensProps {
  tokens: Token[]
  note?: MarkdownNote
}
