import { error } from '../utils'
import { openDB } from './db'
import processFile from './processFile'
import processNote from './processNote'
import processTags from './processTags'
import { BearProcessedNote } from './types'

export async function processNotes(
  dbFile: string
): Promise<BearProcessedNote[] | undefined> {
  const allNotesSql = 'SELECT * FROM ZSFNOTE'
  const allFilesSql = 'SELECT * FROM ZSFNOTEFILE'
  const allTagsSql = 'SELECT * FROM ZSFNOTETAG'
  const noteTagRelationSql = 'SELECT * FROM Z_5TAGS'

  try {
    const db = await openDB(dbFile)
    const notes = await db.all(allNotesSql)
    const files = await db.all(allFilesSql)
    const tags = await db.all(allTagsSql)
    const noteTags = await db.all(noteTagRelationSql)
    const processedTags = tags.map((tag) => processTags(tag, noteTags))
    const processedFiles = files.map(processFile)
    return notes.map((note) => processNote(note, processedFiles, processedTags))
  } catch (e) {
    error('failed to read DB')
    console.error(e)
  }
}
