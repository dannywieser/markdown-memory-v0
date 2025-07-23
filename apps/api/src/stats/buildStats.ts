import { RedisClientType } from 'redis'

import { getAllNotes } from '../notes/util'
import { Stats } from './types'

export default async function buildStats(
  redis: RedisClientType
): Promise<Stats> {
  const allNotes = await getAllNotes(redis)
  const dateMap = new Map()
  return {
    entriesByDay: dateMap,
    totalEntries: allNotes.length,
    totalTags: 0,
  }
}
