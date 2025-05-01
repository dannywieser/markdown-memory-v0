import { MarkdownNote } from '@markdown-memory/markdown'

export interface NotesOnDayByGroup {
  day: string
  groupName: string
  notes: MarkdownNote[]
}

export interface UseNotesOnDayByGroupProps {
  day: string
  groups: string[]
}
