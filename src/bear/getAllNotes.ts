import { error } from '../utils'
import { openDB } from './db'
import processNote from './processNote'
import { BearProcessedNote } from './types'

export async function getAllNotes(
  dbFile: string
): Promise<BearProcessedNote[] | undefined> {
  const sql = 'SELECT * FROM ZSFNOTE'
  try {
    const db = await openDB(dbFile)
    const raw = await db.all(sql)
    return raw.map(processNote)
    //return [processNote(raw[57], 0)]
  } catch (e) {
    error('failed to read DB')
    console.error(e)
  }
}
