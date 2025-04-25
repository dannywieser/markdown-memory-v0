import { lexer, MarkdownNote } from '@markdown-memory/markdown'
import { convertDate } from '@markdown-memory/utilities'

import { BearProcessedFile, BearProcessedTag, BearRawNote } from './types'
import { extractNoteTags, fixImagePaths, generateExternalUrl } from './util'

export default function processNote(
  rawNote: BearRawNote,
  allTags: BearProcessedTag[],
  allFiles: BearProcessedFile[]
): MarkdownNote {
  const {
    Z_PK: notePrimaryKey,
    ZCREATIONDATE: creationDate,
    ZMODIFICATIONDATE: modificationDate,
    ZTEXT: rawNoteText,
    ZTITLE: title,
    ZUNIQUEIDENTIFIER: noteUniqueId,
  } = rawNote
  const noteFiles = allFiles.filter(({ noteId }) => noteId === notePrimaryKey)
  const noteText = fixImagePaths(rawNoteText, noteFiles)
  const tags = extractNoteTags(notePrimaryKey, allTags)

  return {
    created: convertDate(creationDate),
    externalUrl: generateExternalUrl(noteUniqueId),
    id: noteUniqueId,
    modified: convertDate(modificationDate),
    source: 'bear',
    tags,
    title,
    tokens: lexer(noteText),
  }
}
