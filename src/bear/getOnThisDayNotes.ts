import { currentDate, removeYear } from '../utils'
import { getAllNotes } from './getAllNotes'
import { BearProcessedNote } from './types'

export async function getOnThisDayNotes(dbFile: string) {
  const allNotes = await getAllNotes(dbFile)
  const date = currentDate()
  const targetDay = removeYear(date)
  return allNotes?.filter((record: BearProcessedNote) => {
    const createdDay = removeYear(record.created)
    return createdDay === targetDay || record.rawText.includes(targetDay)
  })
}
