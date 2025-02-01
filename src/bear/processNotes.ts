import { error } from '../utils'
import { openDB } from './db'
import processFile from './processFile'
import processNote from './processNote'
import { BearProcessedNote } from './types'

export async function processNotes(
  dbFile: string
): Promise<BearProcessedNote[] | undefined> {
  const allNotesSql = 'SELECT * FROM ZSFNOTE'
  const allFilesSql = 'SELECT * FROM ZSFNOTEFILE'

  try {
    const db = await openDB(dbFile)
    const notes = await db.all(allNotesSql)
    const files = await db.all(allFilesSql)
    const processedFiles = files.map(processFile)
    return notes.map((note) => processNote(note, processedFiles))
  } catch (e) {
    error('failed to read DB')
    console.error(e)
  }
}
