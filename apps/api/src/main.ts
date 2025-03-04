import { redisConnect, NOTE_KEY_PREFIX } from '@markdown-memory/utilities'
import express from 'express'

const app = express()

let redis
redisConnect().then((redisClient) => {
  redis = redisClient
})

const getNote = async (id: string) => {
  const noteId = `${NOTE_KEY_PREFIX}${id}`
  const { created, modified, title, tokens, identifier } =
    await redis.hGetAll(noteId)
  return {
    id: identifier,
    created: Number(created),
    modified: Number(modified),
    title,
    tokens: JSON.parse(tokens),
  }
}

app.get('/api/notes/:noteId', async (req, res) => {
  const noteId = req.params.noteId
  const note = await getNote(noteId)
  if (!note) {
    res.status(404).send('<div>404 Not Found</div>')
  }

  res.send(note)
})

app.get('/api/notes', async (req, res) => {
  const day = req.query.day

  if (day) {
    const daySet = await redis.sMembers(day as string)
    const notes = await Promise.all(daySet.map(async (id) => await getNote(id)))
    res.send(notes)
  }

  const allKeys = await redis.keys('note:*')
  const notes = await Promise.all(allKeys.map(async (id) => await getNote(id)))
  // TODO: pagination!
  res.send(notes)
})

const port = process.env.PORT || 3334
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`)
})
server.on('error', console.error)
