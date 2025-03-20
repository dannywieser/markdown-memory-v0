import { MarkdownNote } from '@markdown-memory/markdown'
import { Token } from 'marked'

export interface NoteProps {
  note: MarkdownNote
  suppressHeader?: boolean
  showLink?: boolean
}

export interface TokenProps {
  token: Token
  suppressHeader?: boolean
  note: MarkdownNote
}
