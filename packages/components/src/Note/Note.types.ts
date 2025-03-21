import { MarkdownNote } from '@markdown-memory/markdown'

export interface NoteProps {
  note: MarkdownNote
  suppressHeader?: boolean
  showLink?: boolean
}
