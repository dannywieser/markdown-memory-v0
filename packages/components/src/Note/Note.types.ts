import { MarkdownNote } from '@markdown-memory/markdown'
import { Token } from 'marked'

export interface NoteProps {
  note: MarkdownNote
}

export interface TokenProps {
  token: Token
}
