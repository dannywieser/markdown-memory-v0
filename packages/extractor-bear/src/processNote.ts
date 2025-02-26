import { BearProcessedTag, BearRawNote } from './types'
import { lexer, MarkdownNote } from '@markdown-memory/markdown'

export default function processNote(
  rawNote: BearRawNote,
  allTags: BearProcessedTag[]
): MarkdownNote {
  // 1. retrieve all files associated with the current note and map to the correct types to save with the record
  const processingNoteId = rawNote.Z_PK

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
    tokens: lexer(rawNote.ZTEXT),
    created: rawNote.ZCREATIONDATE,
    id: rawNote.ZUNIQUEIDENTIFIER,
    modified: rawNote.ZMODIFICATIONDATE,
    tags,
    title: rawNote.ZTITLE,
  }
}
