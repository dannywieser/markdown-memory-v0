import {
  activity,
  cacheKey,
  countFrequenciesInArray,
  DAY_PREFIX,
  DAY_TAGS_PREFIX,
  GROUP_KEY_PREFIX,
  header1,
  loadEnv,
  NOTETAG_KEY_PREFIX,
} from '@markdown-memory/utilities'
import express from 'express'
import { createClient, RedisClientType } from 'redis'

import { sortNotesByDate } from './files/util'
import { getAllNotes, getNote } from './notes/util'
import buildStats from './stats/buildStats'

const app = express()

const NOT_FOUND = '<div>404 Not Found</div>'
const { REDIS_HOST: redisHost = '127.0.0.1' } = loadEnv()
const redisUrl = `redis://${redisHost}:6379`
const redis: RedisClientType = createClient({ url: redisUrl })
redis.on('error', (err) => console.log('Redis Client Error', err))

const getTags = async (noteId: string) => {
  const setKey = cacheKey(NOTETAG_KEY_PREFIX, noteId)
  const tags = await redis.sMembers(setKey)
  return tags
}

app.get('/api/notes/:noteId', async ({ params: { noteId } }, res) => {
  const note = await getNote(redis, noteId)
  if (!note) {
    res.status(404).send(NOT_FOUND)
  }

  activity(`/api/notes/${noteId} 200`, 2)
  res.send(note)
})

app.get('/api/notes/:noteId/tags', async ({ params: { noteId } }, res) => {
  const tags = await getTags(noteId)
  if (!tags) {
    res.status(404).send(NOT_FOUND)
  }

  activity(`/api/notes/${noteId}/tags | results: ${tags.length}`, 2)
  res.send(tags)
})

const getNotesForDay = async (day: string) => {
  const dayKey = cacheKey(DAY_PREFIX, day)
  activity(`dayKey : ${dayKey}`, 2)
  const daySet = await redis.sMembers(dayKey as string)
  const notes = await Promise.all(
    daySet.map(async (id) => await getNote(redis, id))
  )
  activity(`/api/notes?day=${day} | results: ${notes.length}`, 2)
  return notes
}

app.get('/api/notes', async (req, res) => {
  const day = req.query.day as string
  const notes = day ? await getNotesForDay(day) : await getAllNotes(redis)
  res.send(sortNotesByDate(notes))
})

app.get('/api/day/:day', async ({ params: { day } }, res) => {
  const dayKey = cacheKey(DAY_PREFIX, day)
  const daySet = await redis.sMembers(dayKey as string)

  const dayTagsKey = cacheKey(DAY_TAGS_PREFIX, day)
  const dayTagsList = await redis.lRange(dayTagsKey, 0, -1)
  const tagFrequency = countFrequenciesInArray(dayTagsList)

  activity(`/api/day/${day} (${dayKey})| results: ${daySet.length}`, 2)
  res.send({
    entries: daySet.length,
    tags: tagFrequency,
  })
})

app.get(
  '/api/notes/groups/:groupName',
  async ({ params: { groupName }, query: { day } }, res) => {
    const groupKey = cacheKey([GROUP_KEY_PREFIX, groupName], day as string)
    const groupSet = await redis.sMembers(groupKey)
    const notes = await Promise.all(
      groupSet.map(async (id) => await getNote(redis, id))
    )
    activity(`/api/notes/groups/${groupName} 200`, 2)
    res.send(sortNotesByDate(notes))
  }
)

app.get('/api/stats', async (_req, res) => {
  const stats = await buildStats(redis)
  res.send(stats)
})

redis.connect().then(() => {
  const port = process.env.API_PORT || 3333
  const server = app.listen(port, () => {
    header1('markdown memory: api')
    activity(`API ready | http://localhost:${port}/api`, 1)
    activity(`redis | ${redisUrl}`, 2)
  })
  server.on('error', console.error)
})
