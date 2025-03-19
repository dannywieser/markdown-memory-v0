import { MarkdownNote } from '@markdown-memory/markdown'
import { Tokens } from 'marked'

export interface NoteHeaderProps {
  token: Tokens.Heading
  note: MarkdownNote
}
