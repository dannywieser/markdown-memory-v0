import {
  NOTE_KEY_PREFIX,
  header1,
  activity,
  NOTETAG_KEY_PREFIX,
  loadEnv,
  cacheKey,
  GROUP_KEY_PREFIX,
} from '@markdown-memory/utilities'
import express from 'express'
import { createClient } from 'redis'

const app = express()

const { REDIS_HOST: redisHost = '127.0.0.1' } = loadEnv()
const redisUrl = `redis://${redisHost}:6379`
const redis = createClient({ url: redisUrl })
redis.on('error', (err) => console.log('Redis Client Error', err))

//TODO: cleanup, splitup, test

const getNote = async (id: string) => {
  const noteId = id.includes(NOTE_KEY_PREFIX)
    ? id
    : cacheKey(NOTE_KEY_PREFIX, id)
  const { created, modified, title, tokens, identifier, source, externalUrl } =
    await redis.hGetAll(noteId)

  return {
    id: identifier,
    created: Number(created),
    modified: Number(modified),
    title,
    tokens: JSON.parse(tokens),
  }
}

const getTags = async (noteId: string) => {
  const setKey = cacheKey(NOTETAG_KEY_PREFIX, noteId)
  const tags = await redis.sMembers(setKey)
  return tags
}

app.get('/api/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId
  const note = await getNote(noteId)
  if (!note) {
    res.status(404).send('<div>404 Not Found</div>')
  }

  activity(`/api/notes/${noteId} 200`, 2)
  res.send(note)
})

app.get('/api/notes/:noteId/tags', async (req, res) => {
  const noteId = req.params.noteId
  const tags = await getTags(noteId)
  if (!tags) {
    res.status(404).send('<div>404 Not Found</div>')
  }

  activity(`/api/notes/${noteId}/tags | results: ${tags.length}`, 2)
  res.send(tags)
})

app.get('/api/notes', async (req, res) => {
  const day = req.query.day

  if (day) {
    const daySet = await redis.sMembers(day as string)
    const notes = await Promise.all(daySet.map(async (id) => await getNote(id)))
    activity(`/api/notes?day=${day} | results: ${notes.length}`, 2)
    res.send(notes)
    return
  }

  const allKeys = await redis.keys('note:*')
  const notes = await Promise.all(allKeys.map(async (id) => await getNote(id)))
  // TODO: pagination!
  res.send(notes)
})

app.get('/api/notes/groups/:groupName', async (req, res) => {
  const groupName = req.params.groupName
  const day = req.query.day as string
  const groupKey = cacheKey([GROUP_KEY_PREFIX, groupName], day)
  const groupSet = await redis.sMembers(groupKey)
  const notes = await Promise.all(groupSet.map(async (id) => await getNote(id)))
  activity(`/api/notes/groups/${groupName} 200`, 2)
  res.send(notes)
})

redis.connect().then(() => {
  const port = process.env.API_PORT || 3333
  const server = app.listen(port, () => {
    header1('markdown memory: extractor')
    activity(`API ready | http://localhost:${port}/api`, 1)
    activity(`redis | ${redisUrl}`, 2)
  })
  server.on('error', console.error)
})
