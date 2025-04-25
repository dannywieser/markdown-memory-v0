import { lexer, MarkdownNote } from '@markdown-memory/markdown'
import { convertDate } from '@markdown-memory/utilities'

import { BearProcessedFile, BearProcessedTag, BearRawNote } from './types'
import {
  extractNoteTags,
  fixImagePaths,
  generateExternalUrl,
  handleWikiLinks,
} from './util'

// This function passes the raw text of the note through several parser functions which update the text ahead of lexing.
const textUpdates = (
  { ZTEXT: rawNoteText }: BearRawNote,
  allNotes: BearRawNote[],
  noteFiles: BearProcessedFile[]
) => {
  const noteTextFixedImages = fixImagePaths(rawNoteText, noteFiles)
  console.log(noteTextFixedImages)
  return handleWikiLinks(noteTextFixedImages, allNotes)
}

export default function processNote(
  rawNote: BearRawNote,
  allNotes: BearRawNote[],
  allTags: BearProcessedTag[],
  allFiles: BearProcessedFile[]
): MarkdownNote {
  const {
    Z_PK: notePrimaryKey,
    ZCREATIONDATE: creationDate,
    ZMODIFICATIONDATE: modificationDate,
    ZTITLE: title,
    ZUNIQUEIDENTIFIER: noteUniqueId,
  } = rawNote
  const noteFiles = allFiles.filter(({ noteId }) => noteId === notePrimaryKey)
  const noteText = textUpdates(rawNote, allNotes, noteFiles)
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
