import { lexer, MarkdownNote } from '@markdown-memory/markdown'
import { convertDate } from '@markdown-memory/utilities'

import { BearProcessedFile, BearProcessedTag, BearRawNote } from './types'
import { generateExternalUrl } from './util'
import extractNoteTags from './util/extractNoteTags'
import fixImagePaths from './util/fixImagePaths'

export default function processNote(
  rawNote: BearRawNote,
  allTags: BearProcessedTag[],
  allFiles: BearProcessedFile[]
): MarkdownNote {
  const {
    Z_PK: notePrimaryKey,
    ZUNIQUEIDENTIFIER: noteUniqueId,
    ZTEXT: rawNoteText,
    ZCREATIONDATE: creationDate,
    ZMODIFICATIONDATE: modificationDate,
    ZTITLE: title,
  } = rawNote
  const noteFiles = allFiles.filter(({ noteId }) => noteId === notePrimaryKey)
  const noteText = fixImagePaths(rawNoteText, noteFiles)
  const tags = extractNoteTags(notePrimaryKey, allTags)

  return {
    tokens: lexer(noteText),
    created: convertDate(creationDate),
    id: noteUniqueId,
    modified: convertDate(modificationDate),
    tags,
    title,
    source: 'bear',
    externalUrl: generateExternalUrl(noteUniqueId),
  }
}
