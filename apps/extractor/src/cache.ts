import { MarkdownNote } from '@markdown-memory/markdown'
import { activity, loadEnv } from '@markdown-memory/utilities'
import { createClient } from 'redis'

export default async function writeToCache(notes: MarkdownNote[]) {
  const { REDIS_HOST: redisHost = '127.0.0.1' } = loadEnv()
  const url = `redis://${redisHost}:6379`
  activity('cache', 1)
  activity(url, 2)
  const client = createClient({ url })
  client.on('error', (err) => console.log('Redis Client Error', err))
  await client.connect()

  activity('caching notes', 2)
  notes.map(async ({ created, modified, tags, title, id, tokens }) => {
    await client.hSet(id, 'created', created.valueOf())
    await client.hSet(id, 'modified', modified.valueOf())
    await client.hSet(id, 'title', title)
    await client.hSet(id, 'tokens', JSON.stringify(tokens))

    // create sets for each tag applied to current note, add note to that set
    tags.map(async (tag: string) => await client.sAdd(tag, id))
  })
  activity('cache complete', 1)
}
