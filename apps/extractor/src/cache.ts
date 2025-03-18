import { MarkdownNote } from '@markdown-memory/markdown'
import { activity, loadEnv } from '@markdown-memory/utilities'
import { createClient } from 'redis'

import cacheFunctions from './cacheFunctions'

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

  activity('caching notes and tag information', 2)
  notes.map(async (note: MarkdownNote) => {
    for (const [_name, cacheFunc] of Object.entries(cacheFunctions)) {
      await cacheFunc(client, note)
    }
  })
  activity('cache complete', 1)
}
