import { getRawNoteText, MarkdownNote } from '@markdown-memory/markdown'
import { loadProfile } from '@markdown-memory/profile'
import {
  findDatesInText,
  fmtDate,
  fmtDateNoYear,
} from '@markdown-memory/utilities'

/**
 * This helper function will return an array of all dates relevant for the note.
 * This includes:
 *  - the creation date for the note. Creation date is parsed into local time to ensure it matches the expected "on this day".
 *  - dates mentioned in the raw note text
 */
const getDatesForNote = (note: MarkdownNote): Date[] => {
  const { created } = note
  const { timezone: timeZone } = loadProfile()
  const fullText = getRawNoteText(note)
  return [
    new Date(created.toLocaleDateString('en-US', { timeZone })),
    ...findDatesInText(fullText),
  ]
}

export async function noteDateCaching(
  note: MarkdownNote,
  cacheOperation: (date: string) => void
) {
  const dates = getDatesForNote(note)
  for (const date of dates) {
    const wholeDate = fmtDate(date)
    cacheOperation(wholeDate)

    const partDate = fmtDateNoYear(date)
    cacheOperation(partDate)
  }
}
