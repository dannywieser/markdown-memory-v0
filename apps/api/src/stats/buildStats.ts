import { Stats } from '@markdown-memory/services'
import { fmtDate } from '@markdown-memory/utilities'
import { RedisClientType } from 'redis'

import { getAllNotes } from '../notes/util'
import { NoteResponse } from '../types'

const createDateMap = (notes: NoteResponse[]) => {
  const dateMap = {}
  notes.forEach(({ created, modified }) => {
    const createDate = fmtDate(new Date(created))
    const modifiedDate = fmtDate(new Date(modified))

    const findDate = (searchDate: string) =>
      dateMap[searchDate] ?? { createdCount: 0, modifiedCount: 0 }

    // bump count for created based on this notes create date
    const createdEntry = findDate(createDate)
    dateMap[createDate] = {
      ...createdEntry,
      createdCount: createdEntry.createdCount + 1,
    }

    // bump count for created based on this notes create date
    const modifiedEntry = findDate(modifiedDate)
    dateMap[modifiedDate] = {
      ...modifiedEntry,
      modifiedCount: modifiedEntry.modifiedCount + 1,
    }
  })

  return dateMap
}

export default async function buildStats(
  redis: RedisClientType
): Promise<Stats> {
  const allNotes = await getAllNotes(redis)
  return {
    entriesByDay: createDateMap(allNotes),
    totalEntries: allNotes.length,
    totalTags: 0,
  }
}
