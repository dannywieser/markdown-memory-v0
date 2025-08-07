import { MarkdownNote } from '@markdown-memory/markdown'
import { Token } from 'marked'

export interface TokenProps {
  note?: MarkdownNote
  token: Token
}

export interface TokensProps {
  note?: MarkdownNote
  tokens?: Token[]
}
