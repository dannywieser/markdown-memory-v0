import { processMarkdownBody } from '../markdown'
import { fmtDate } from '../utils'
import {
  BearNoteFile,
  BearProcessedFile,
  BearProcessedNote,
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

export default function processNote(
  rawNote: BearRawNote,
  allFiles: BearProcessedFile[]
): BearProcessedNote {
  // info(`[${index}] ${rawNote.ZTITLE}`)

  // Retrieve all files associated with the current note and map to the correct types to save with the record
  const pk = rawNote.Z_PK
  const notesFiles = allFiles.filter(({ noteId }) => noteId === pk)
  const files: BearNoteFile[] = notesFiles.map(
    ({ fileId, filename }): BearNoteFile => ({
      filename,
      folder: fileId,
    })
  )

  return {
    body: processMarkdownBody(rawNote.ZTEXT),
    created: convertDate(rawNote.ZCREATIONDATE),
    files,
    hasFiles: rawNote.ZHASFILES === 1,
    hasImages: rawNote.ZHASIMAGES === 1,
    id: rawNote.ZUNIQUEIDENTIFIER,
    modified: convertDate(rawNote.ZMODIFICATIONDATE),
    rawText: rawNote.ZTEXT,
    title: rawNote.ZTITLE,
  }
}
