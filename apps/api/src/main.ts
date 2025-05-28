import { MarkdownNoteSource } from '@markdown-memory/markdown'
import {
  activity,
  cacheKey,
  FILESET_PREFIX,
  GROUP_KEY_PREFIX,
  header1,
  loadEnv,
  NOTE_KEY_PREFIX,
  NOTETAG_KEY_PREFIX,
} from '@markdown-memory/utilities'
import { compareAsc, toDate } from 'date-fns'
import express from 'express'
import { createClient } from 'redis'

import { NoteResponse } from './types'

const app = express()

const { REDIS_HOST: redisHost = '127.0.0.1' } = loadEnv()
const redisUrl = `redis://${redisHost}:6379`
const redis = createClient({ url: redisUrl })
redis.on('error', (err) => console.log('Redis Client Error', err))

//TODO: cleanup, splitup, test

export const sortNotesByDate = (notes: NoteResponse[]) => {
  return notes.sort(({ created: createdA }, { created: createdB }) =>
    compareAsc(toDate(createdA), toDate(createdB))
  )
}

const getNote = async (id: string): Promise<NoteResponse> => {
  const noteId = id.includes(NOTE_KEY_PREFIX)
    ? id
    : cacheKey(NOTE_KEY_PREFIX, id)
  const { created, externalUrl, identifier, modified, source, title, tokens } =
    await redis.hGetAll(noteId)

  const filePaths = await getFiles(id)

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

const getFiles = async (noteId: string) => {
  const setKey = cacheKey(FILESET_PREFIX, noteId)
  const files = await redis.sMembers(setKey)
  return files
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

const getNotesForDay = async (day: string) => {
  const daySet = await redis.sMembers(day as string)
  const notes = await Promise.all(daySet.map(async (id) => await getNote(id)))
  activity(`/api/notes?day=${day} | results: ${notes.length}`, 2)
  return notes
}

// TODO: paginate
const getAllNotes = async () => {
  const allKeys = await redis.keys('note:*')
  return await Promise.all(allKeys.map(async (id) => await getNote(id)))
}

app.get('/api/notes', async (req, res) => {
  const day = req.query.day as string
  const notes = day ? await getNotesForDay(day) : await getAllNotes()
  res.send(sortNotesByDate(notes))
})

app.get('/api/notes/groups/:groupName', async (req, res) => {
  const groupName = req.params.groupName
  const day = req.query.day as string
  const groupKey = cacheKey([GROUP_KEY_PREFIX, groupName], day)
  const groupSet = await redis.sMembers(groupKey)
  const notes = await Promise.all(groupSet.map(async (id) => await getNote(id)))
  activity(`/api/notes/groups/${groupName} 200`, 2)
  res.send(sortNotesByDate(notes))
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
