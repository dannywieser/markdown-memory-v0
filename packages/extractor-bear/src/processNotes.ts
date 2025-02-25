import { activity, sqliteOpen } from '@markdown-memory/utilities'
import processNote from './processNote'
import processTags from './processTags'
import { BearProcessedNote } from './types'

import { BearProcessedFile, BearRawFile } from './types'

function processFile(rawFile: BearRawFile): BearProcessedFile {
  return {
    fileId: rawFile.ZUNIQUEIDENTIFIER,
    filename: rawFile.ZFILENAME,
    noteId: rawFile.ZNOTE,
  }
}

export async function processNotes(
  dbFile: string
): Promise<BearProcessedNote[] | undefined> {
  try {
    const db = await sqliteOpen(dbFile)
    const notes = await db.all('SELECT * FROM ZSFNOTE')
    const files = await db.all('SELECT * FROM ZSFNOTEFILE')
    const tags = await db.all('SELECT * FROM ZSFNOTETAG')
    const noteTags = await db.all('SELECT * FROM Z_5TAGS')

    activity(`.. files: ${files.length}`)
    const processedFiles = files.map(processFile)

    activity(`.. tags:  ${tags.length}`)
    const processedTags = tags.map((tag) => processTags(tag, noteTags))

    activity(`.. notes: ${notes.length}`)
    return notes.map((note) => processNote(note, processedFiles, processedTags))
  } catch (e) {
    console.error('failed to read DB', e)
  }
  return undefined
}
