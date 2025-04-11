import { lexer, MarkdownNote } from '@markdown-memory/markdown'
import { convertDate } from '@markdown-memory/utilities'

import { BearProcessedFile, BearProcessedTag, BearRawNote } from './types'
import { generateExternalUrl } from './util'

const processImages = (rawNote: string, noteFiles: BearProcessedFile[]) => {
  const specialTokensRegex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  const matches = rawNote.matchAll(specialTokensRegex)

  if (!matches) {
    return rawNote
  }

  for (const match of matches) {
    const filename = match[1]
    const matchedFile = noteFiles.find(({ filename }) => filename === match[1])

    const fullFilePath = matchedFile
      ? `${matchedFile.fileId}/${matchedFile.filename}`
      : filename

    rawNote = rawNote.replace(filename, fullFilePath)
  }
  return rawNote
}

export default function processNote(
  rawNote: BearRawNote,
  allTags: BearProcessedTag[],
  allFiles: BearProcessedFile[]
): MarkdownNote {
  // 1. retrieve all files associated with the current note and map to the correct types to save with the record
  const processingNoteId = rawNote.Z_PK
  const noteFiles = allFiles.filter(({ noteId }) => noteId === processingNoteId)
  const noteText = processImages(rawNote.ZTEXT, noteFiles)

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
    tokens: lexer(noteText),
    created: convertDate(rawNote.ZCREATIONDATE),
    id: rawNote.ZUNIQUEIDENTIFIER,
    modified: convertDate(rawNote.ZMODIFICATIONDATE),
    tags,
    title: rawNote.ZTITLE,
    source: 'bear',
    externalUrl: generateExternalUrl(rawNote.ZUNIQUEIDENTIFIER),
  }
}
