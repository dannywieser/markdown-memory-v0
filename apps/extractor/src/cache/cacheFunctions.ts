import { MarkdownNote } from '@markdown-memory/markdown'
import { isNoteInGroup, loadGroups } from '@markdown-memory/profile'
import {
  cacheKey,
  DAY_PREFIX,
  DAY_TAGS_PREFIX,
  FILESET_PREFIX,
  GROUP_KEY_PREFIX,
  NOTE_KEY_PREFIX,
  NOTETAG_KEY_PREFIX,
  TAGSET_PREFIX,
} from '@markdown-memory/utilities'
import { createClient } from 'redis'

import { noteDateCaching } from './util'

export type RedisClient = ReturnType<typeof createClient>

/**
 * This function will cache the primary note to a key of`<NOTE_KEY_PREFIX><Note ID>`.
 * The primary note data is stored as a hash set.
 */
const cacheNote = async (client: RedisClient, note: MarkdownNote) => {
  const { created, externalUrl, id, modified, source, title, tokens } = note
  const noteId = cacheKey(NOTE_KEY_PREFIX, id)
  await client.hSet(noteId, 'created', created.valueOf())
  await client.hSet(noteId, 'externalUrl', externalUrl)
  await client.hSet(noteId, 'modified', modified.valueOf())
  await client.hSet(noteId, 'source', source)
  await client.hSet(noteId, 'title', title)
  await client.hSet(noteId, 'identifier', id)
  await client.hSet(noteId, 'tokens', JSON.stringify(tokens))
}

/**
 * For each tag that is linked to the note, that tag will be added to a SET containing all notes assigned to that tag.
 * As all notes are parsed, this set will grow to contain a full list of note IDs with that tag assigned.
 * The set is named: <TAGSET_PREFIX>:<tag>
 */
const addNoteToTagSet = async (client: RedisClient, note: MarkdownNote) => {
  const { id, tags } = note
  tags.map(async (tag: string) => {
    const tagId = cacheKey(TAGSET_PREFIX, tag)
    await client.sAdd(tagId, id)
  })
}

/**
 * For each tag that is linked to a note, that tag will be added to a SET specific to that note.
 * This will allow for querying of all tags for that note.
 * The set is named <NOTETAG_KEY_PREFIX><Note Id>
 */
const addTagsToNoteSet = async (client: RedisClient, note: MarkdownNote) => {
  const { id, tags } = note
  // create a set of tags for the given note
  tags.map(async (tag: string) => {
    const noteTagId = cacheKey(NOTETAG_KEY_PREFIX, id)
    await client.sAdd(noteTagId, tag)
  })
}

const addNoteToGroups = async (client: RedisClient, note: MarkdownNote) => {
  const groups = loadGroups()
  const { id } = note
  groups.map(async (group) => {
    const { name } = group
    const noteInGroup = isNoteInGroup(note, group)
    // first add note to global group set
    const groupKey = cacheKey(GROUP_KEY_PREFIX, name)
    if (noteInGroup) {
      await client.sAdd(groupKey, id)
      noteDateCaching(note, async (date) => {
        const key = cacheKey(groupKey, date)
        await client.sAdd(key, id)
      })
    }
  })
}

const cacheNoteByDay = async (client: RedisClient, note: MarkdownNote) => {
  const { id } = note
  noteDateCaching(note, async (date) => {
    const key = cacheKey(DAY_PREFIX, date)
    await client.sAdd(key, id)
  })
}

const cacheListOfTagsByDay = async (
  client: RedisClient,
  note: MarkdownNote
) => {
  const { tags } = note
  tags.map(async (tag: string) => {
    noteDateCaching(note, async (date) => {
      const key = cacheKey(DAY_TAGS_PREFIX, date)
      await client.rPush(key, tag)
    })
  })
}

const cacheImagePathsForGroup = async (
  client: RedisClient,
  note: MarkdownNote
) => {
  const { filePaths, id } = note
  const fileSetKey = cacheKey(FILESET_PREFIX, id)

  filePaths.map(async (imagePath) => await client.sAdd(fileSetKey, imagePath))
}

export default {
  addNoteToGroups,
  addNoteToTagSet,
  addTagsToNoteSet,
  cacheImagePathsForGroup,
  cacheListOfTagsByDay,
  cacheNote,
  cacheNoteByDay,
}
