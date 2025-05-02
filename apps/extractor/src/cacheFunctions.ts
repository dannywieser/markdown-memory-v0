import { getRawNoteText, MarkdownNote } from '@markdown-memory/markdown'
import {
  isNoteInGroup,
  loadGroups,
  loadProfile,
} from '@markdown-memory/profile'
import {
  cacheKey,
  FILESET_PREFIX,
  findDatesInText,
  fmtDate,
  fmtDateNoYear,
  GROUP_KEY_PREFIX,
  NOTE_KEY_PREFIX,
  NOTETAG_KEY_PREFIX,
  TAGSET_PREFIX,
} from '@markdown-memory/utilities'
import { createClient } from 'redis'

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

/**
 * This helper function will return an array of all dates relevant for the note.
 * This includes:
 *  - the creation date for the note. Creation date is parsed into local time to ensure it matches the expected "on this day".
 *  - dates mentioned in the raw note text
 */
const getDatesForNote = (note: MarkdownNote): Date[] => {
  const { created } = note
  const { timezone: timeZone } = loadProfile()
  const fullText = getRawNoteText(note)
  return [
    new Date(created.toLocaleDateString('en-US', { timeZone })),
    ...findDatesInText(fullText),
  ]
}
/**
 * The ID of each note will be added to two date sets:
 *  - one with the full date YYYY.MM.DD.
 *  - one with a partial date MM.DD.
 *
 * This date is based on two things:
 *  - create date for the note
 *  - a full text search for string patterns matching the defined date format
 */
const addNoteToDateSets = async (
  client: RedisClient,
  note: MarkdownNote,
  keyPrefix = ''
) => {
  const { id } = note
  const dates = getDatesForNote(note)
  for (const date of dates) {
    // // add note to a set for the current date in yyyy.MM.dd format
    const wholeDate = fmtDate(date)
    const wholeDateSetKey = keyPrefix
      ? cacheKey(keyPrefix, wholeDate)
      : wholeDate
    await client.sAdd(wholeDateSetKey, id)

    // add note to a set with the date in MM.dd format
    const partDate = fmtDateNoYear(date)
    const partDateSetKey = keyPrefix ? cacheKey(keyPrefix, partDate) : wholeDate
    await client.sAdd(partDateSetKey, id)
  }
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
      addNoteToDateSets(client, note, groupKey)
    }
  })
}

const cacheImagePathsForGroup = async (
  client: RedisClient,
  note: MarkdownNote
) => {
  const { id, imagePaths } = note
  const fileSetKey = cacheKey(FILESET_PREFIX, id)

  imagePaths.map(async (imagePath) => {
    await client.sAdd(fileSetKey, imagePath)
  })
}

export default {
  addNoteToDateSets,
  addNoteToGroups,
  addNoteToTagSet,
  addTagsToNoteSet,
  cacheImagePathsForGroup,
  cacheNote,
}
