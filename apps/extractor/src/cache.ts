import { MarkdownNote } from '@markdown-memory/markdown'
import {
  activity,
  fmtDate,
  fmtDateNoYear,
  loadEnv,
  NOTETAG_KEY_PREFIX,
  NOTE_KEY_PREFIX,
  TAGSET_PREFIX,
} from '@markdown-memory/utilities'
import { createClient } from 'redis'

export default async function writeToCache(notes: MarkdownNote[]) {
  const { REDIS_HOST: redisHost = '127.0.0.1' } = loadEnv()
  const url = `redis://${redisHost}:6379`
  activity('cache', 1)
  activity(url, 2)
  const client = createClient({ url })
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()
  activity('clearing keys', 2)
  // every extractor run clears all keys and starts from scratch
  await client.flushDb()

  activity('caching notes', 2)
  notes.map(async ({ created, modified, tags, title, id, tokens }) => {
    const noteId = `${NOTE_KEY_PREFIX}${id}`
    await client.hSet(noteId, 'created', created.valueOf())
    await client.hSet(noteId, 'modified', modified.valueOf())
    await client.hSet(noteId, 'title', title)
    await client.hSet(noteId, 'identifier', id)
    await client.hSet(noteId, 'tokens', JSON.stringify(tokens))

    // add the note ID to top level tag set
    tags.map(async (tag: string) => {
      const tagId = `${TAGSET_PREFIX}${tag}`
      await client.sAdd(tag, tagId)
    })

    // create a set of tags for the given note
    tags.map(async (tag: string) => {
      const noteTagId = `${NOTETAG_KEY_PREFIX}${id}`
      await client.sAdd(noteTagId, tag)
    })

    // add note to a set for the current date in yyyy.MM.dd format
    const wholeDateSet = fmtDate(created)
    await client.sAdd(wholeDateSet, id)
    // add note to a set with the date in MM.dd format
    const partDateSet = fmtDateNoYear(created)
    await client.sAdd(partDateSet, id)
  })
  activity('cache complete', 1)
}
