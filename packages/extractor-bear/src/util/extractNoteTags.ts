import { BearProcessedTag } from '../types'
/**
 * Bear stores a mapping of notes to tags.
 * This function will take a give Note ID and locate all the tags mapped to that note, and then
 * return those tags as a simple array of strings.
 * @param noteId
 * @param allTags
 * @returns Array of strings representing the tags for a note
 */
export default function extractNoteTags(
  noteId: number,
  allTags: BearProcessedTag[]
) {
  return (
    allTags
      // first find tags that have been assigned to this current note ID
      .filter(({ noteIds }) => noteIds.some((id: number) => id === noteId))
      // then reduce the result down to a string array only containing the tags title
      .reduce(
        (titles: string[], { title }: BearProcessedTag) => [...titles, title],
        []
      )
  )
}
