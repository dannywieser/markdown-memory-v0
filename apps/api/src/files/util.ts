import { cacheKey, FILESET_PREFIX } from '@markdown-memory/utilities'
import { compareAsc, toDate } from 'date-fns'
import { RedisClientType } from 'redis'

import { NoteResponse } from '../types'

export const sortNotesByDate = (notes: NoteResponse[]) => {
  return notes.sort(({ created: createdA }, { created: createdB }) =>
    compareAsc(toDate(createdA), toDate(createdB))
  )
}

export const getFiles = async (redis: RedisClientType, noteId: string) => {
  const setKey = cacheKey(FILESET_PREFIX, noteId)
  const files = await redis.sMembers(setKey)
  return files
}
