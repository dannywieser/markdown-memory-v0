import { MarkdownNote } from './types'

/**
 * Given a MarkdownNote, return a string that represents the full "raw" text for the note
 */
export const getRawNoteText = (note: MarkdownNote) =>
  (note &&
    note.tokens &&
    note.tokens.reduce((noteText: string, { raw }) => (noteText += raw), '')) ||
  ''
