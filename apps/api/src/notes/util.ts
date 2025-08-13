import { MarkdownNoteSource } from '@markdown-memory/markdown'
import { cacheKey, NOTE_KEY_PREFIX } from '@markdown-memory/utilities'
import { RedisClientType } from 'redis'

import { getFiles } from '../files/util'
import { NoteResponse } from '../types'

export const getNote = async (
  redis: RedisClientType,
  id: string
): Promise<NoteResponse> => {
  const noteId = id.includes(NOTE_KEY_PREFIX)
    ? id
    : cacheKey(NOTE_KEY_PREFIX, id)
  const { created, externalUrl, identifier, modified, source, title, tokens } =
    await redis.hGetAll(noteId)

  const filePaths = await getFiles(redis, id)

  return {
    created: Number(created),
    externalUrl,
    filePaths,
    id: identifier,
    modified: Number(modified),
    source: source as MarkdownNoteSource,
    title,
    tokens: JSON.parse(tokens),
  }
}

export const getAllNotes = async (redis: RedisClientType) => {
  const allKeys = await redis.keys('note:*')

  return await Promise.all(allKeys.map(async (id) => await getNote(redis, id)))
}

export const getRandomNote = async (redis: RedisClientType) => {
  const allKeys = await redis.keys('note:*')
  if (allKeys.length === 0) return null
  const randomIndex = Math.floor(Math.random() * allKeys.length)
  const randomKey = allKeys[randomIndex]
  return await getNote(redis, randomKey)
}
