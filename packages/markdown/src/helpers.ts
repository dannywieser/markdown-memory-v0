import { MarkdownNote } from './types'

/**
 * Given a MarkdownNote, return a string that represents the full "raw" text for the note
 */
export const getRawNoteText = ({ tokens }: MarkdownNote) =>
  tokens.reduce((noteText: string, { raw }) => (noteText += raw), '')
