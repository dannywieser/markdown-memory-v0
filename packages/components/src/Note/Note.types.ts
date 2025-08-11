import { MarkdownNote } from '@markdown-memory/markdown'

export interface NoteProps {
  note: MarkdownNote
  searchTerm?: string
  showLink?: boolean
  suppressHeader?: boolean
}
