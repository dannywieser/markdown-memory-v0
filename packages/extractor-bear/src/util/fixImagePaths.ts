import { BearProcessedFile } from '../types'

/**
 * Bear images are saved in the note with a filename like "abc123.jpg", but the image files for each note are stored in a
 * subdirectory with a unique ID that is not included in this path. In order for the image server to resolve the image correctly,
 * we need the full path including this unique ID folder.
 *
 * This function maps a relative path like:
 *    ![](abc123.jpg)
 * To
 *    ![](45678/abc123.jpg)
 *
 * The mapping is facilitated via the noteFiles array, which is the complete set of files located during this extraction run.
 * @param rawNote
 * @param noteFiles
 * @returns Raw note text with urls updated for images
 */
export default function fixImagePaths(
  rawNote: string,
  noteFiles: BearProcessedFile[]
) {
  // Markdown images have syntax of ![]()
  const imageHrefRegex = /!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g
  const matches = rawNote.matchAll(imageHrefRegex)

  for (const match of matches) {
    const matchedFileName = match[1]
    const matchedFile = noteFiles.find(
      ({ filename }) => filename === matchedFileName
    )

    const fullFilePath = matchedFile
      ? `${matchedFile.fileId}/${matchedFile.filename}`
      : matchedFileName

    rawNote = rawNote.replace(matchedFileName, fullFilePath)
  }
  return rawNote
}
