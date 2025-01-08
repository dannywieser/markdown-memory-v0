import { error, fmtDate } from '../utils'
import { openDB } from './db'
import { BearProcessedNote, BearRawNote } from './types'

// times are from 2001 vs 1970
const EPOCH_OFFSET = 978_265_512_000

/**
 * Dates for Bear are an epoch time starting from 2001 vs 1970. This function will convert these dates in Date objects
 * @param bearDate
 * @returns Date
 */
const convertDate = (bearDate: string) => {
  const epochMs = parseFloat(bearDate) * 1000 + EPOCH_OFFSET
  return fmtDate(new Date(epochMs))
}

async function processRawNotes(
  rawNotes: BearRawNote[]
): Promise<BearProcessedNote[]> {
  return rawNotes.map((raw) => ({
    created: convertDate(raw.ZCREATIONDATE),
    hasFiles: raw.ZHASFILES === 1,
    hasImages: raw.ZHASIMAGES === 1,
    modified: convertDate(raw.ZMODIFICATIONDATE),
    text: raw.ZTEXT,
    title: raw.ZTITLE,
  }))
}

export async function getAllNotes(dbFile: string) {
  const sql = 'SELECT * FROM ZSFNOTE'
  try {
    const db = await openDB(dbFile)
    const raw = await db.all(sql)
    return processRawNotes(raw)
  } catch (e) {
    error('failed to read DB')
    console.error(e)
  }
}
