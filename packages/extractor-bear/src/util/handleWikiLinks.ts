import { BearRawNote } from '../types'

/**"
 * Bear wiki-style links to other notes are saved in the format "[[Note Title]]".
 * The marked js lexer doesn't process these because it really can't link this to the right spot.
 * This function will:
 *     - locate all wikilinks via a regex
 *     - find the **first** matching note via a title lookup
 *     - replace the wikilink "[[title]]" with a normal link "[title](/note/id)" in the note's raw text
 * @param rawNote
 * @param allNotes
 * @returns raw note text with wikilinks converted to normal links
 */
export default function handleWikiLinks(
  rawNote: string,
  allNotes: BearRawNote[]
) {
  const wikilinkRegex = /\[\[(.+?)\]\]/g
  const matches = rawNote.matchAll(wikilinkRegex)

  for (const match of matches) {
    const wikiLinkText = match[1]
    const fullMatch = match[0]
    const matchedNote = allNotes.find(({ ZTITLE }) => ZTITLE === wikiLinkText)
    if (matchedNote) {
      const regularLink = `[${wikiLinkText}](/note/${matchedNote?.ZUNIQUEIDENTIFIER})`
      rawNote = rawNote.replace(fullMatch, regularLink)
    }
  }
  return rawNote
}
