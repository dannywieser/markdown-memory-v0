import { processMarkdownBody } from '../markdown'
import { fmtDate } from '../utils'
import { copyNoteImage } from './copy'
import {
  BearNoteFile,
  BearProcessedFile,
  BearProcessedNote,
  BearProcessedTag,
  BearRawNote,
} from './types'

// times are from 2001 vs 1970
const EPOCH_OFFSET = 978_265_512_000

/**
 * Dates for Bear are an epoch time starting from 2001 vs 1970. This function will convert these dates in Date objects
 * @param bearDate
 * @returns Date
 */
const convertDate = (bearDate: string) => {
  const epochMs = parseFloat(bearDate) * 1000 + EPOCH_OFFSET
  return fmtDate(new Date(epochMs))
}

export default function saveNote(
  rawNote: BearRawNote,
  allFiles: BearProcessedFile[],
  allTags: BearProcessedTag[]
): BearProcessedNote {
  // 1. retrieve all files associated with the current note and map to the correct types to save with the record
  const processingNoteId = rawNote.Z_PK
  const notesFiles = allFiles.filter(
    ({ noteId }) => noteId === processingNoteId
  )
  notesFiles.forEach(({ fileId, filename }) => copyNoteImage(filename, fileId))
  const files: BearNoteFile[] = notesFiles.map(
    ({ fileId, filename }): BearNoteFile => ({
      filename,
      folder: fileId,
    })
  )

  // 2. retrieve all tags associated with the current note
  const tags = allTags
    // first find tags that have been assigned to this current note ID
    .filter(({ noteIds }) =>
      noteIds.some((id: number) => id === processingNoteId)
    )
    // then reduce the result down to a string array only containing the tags title
    .reduce(
      (titles: string[], { title }: BearProcessedTag) => [...titles, title],
      []
    )

  return {
    body: processMarkdownBody(rawNote.ZTEXT, files),
    created: convertDate(rawNote.ZCREATIONDATE),
    files,
    hasFiles: rawNote.ZHASFILES === 1,
    hasImages: rawNote.ZHASIMAGES === 1,
    id: rawNote.ZUNIQUEIDENTIFIER,
    modified: convertDate(rawNote.ZMODIFICATIONDATE),
    rawText: rawNote.ZTEXT,
    tags,
    title: rawNote.ZTITLE,
  }
}
