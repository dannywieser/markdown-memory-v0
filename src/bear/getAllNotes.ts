import { error } from '../utils'
import { openDB } from './db'
import processNote from './processNote'

export async function getAllNotes(dbFile: string) {
  const sql = 'SELECT * FROM ZSFNOTE'
  try {
    const db = await openDB(dbFile)
    const raw = await db.all(sql)
    return raw.map(processNote)
  } catch (e) {
    error('failed to read DB')
    console.error(e)
  }
}
