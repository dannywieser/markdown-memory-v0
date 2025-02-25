import {
  loadEnv,
  doCopy,
  header2,
  activity,
  sqliteOpen,
} from '@markdown-memory/utilities'
import { BearProcessedNote } from './types'
import processTags from './processTags'
import processNote from './processNote'
import { processFile } from './processFile'

// the name of the Bear database file
const sourceFile = 'database.sqlite'
const targetFolder = 'extract-backup'
const targetFile = ''

export async function processNotes(): Promise<BearProcessedNote[] | undefined> {
  try {
    const db = await sqliteOpen(`${targetFolder}/bear-backup.sqlite`)
    const notes = await db.all('SELECT * FROM ZSFNOTE')
    const files = await db.all('SELECT * FROM ZSFNOTEFILE')
    const tags = await db.all('SELECT * FROM ZSFNOTETAG')
    const noteTags = await db.all('SELECT * FROM Z_5TAGS')

    activity(`.. files: ${files.length}`)
    const processedFiles = files.map(processFile)

    activity(`.. tags:  ${tags.length}`)
    const processedTags = tags.map((tag) => processTags(tag, noteTags))

    activity(`.. notes: ${notes.length}`)
    return notes.map((note) => processNote(note, processedFiles, processedTags))
  } catch (e) {
    console.error('failed to read DB', e)
  }
  return undefined
}

export default async function extract() {
  header2('running bear extractor')
  const { BEAR_APP_DATA_DIR: sourceRoot } = loadEnv()
  activity('. copy db')
  activity(`.. ${sourceRoot}`)
  doCopy({
    sourceRoot,
    sourceFile,
    targetRoot: '.',
    targetFolder,
    targetFile,
  })
  activity('. copy complete')
  activity('. starting note extraction')
  processNotes()
}
