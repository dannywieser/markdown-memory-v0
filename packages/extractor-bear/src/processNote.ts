import {
  BearNoteFile,
  BearProcessedFile,
  BearProcessedNote,
  BearProcessedTag,
  BearRawNote,
} from './types'

export default function processNote(
  rawNote: BearRawNote,
  allFiles: BearProcessedFile[],
  allTags: BearProcessedTag[]
): BearProcessedNote {
  // 1. retrieve all files associated with the current note and map to the correct types to save with the record
  const processingNoteId = rawNote.Z_PK
  const notesFiles = allFiles.filter(
    ({ noteId }) => noteId === processingNoteId
  )
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
    body: rawNote.ZTEXT, // TODO: process Markdown body
    created: rawNote.ZCREATIONDATE,
    files,
    hasFiles: rawNote.ZHASFILES === 1,
    hasImages: rawNote.ZHASIMAGES === 1,
    id: rawNote.ZUNIQUEIDENTIFIER,
    modified: rawNote.ZMODIFICATIONDATE,
    rawText: rawNote.ZTEXT,
    tags,
    title: rawNote.ZTITLE,
  }
}
