import {
  loadEnv,
  doCopy,
  header2,
  activity,
  sqliteOpen,
} from '@markdown-memory/utilities'
import { BearProcessedFile, BearProcessedTag } from './types'
import { processTag } from './processTags'
import processNote from './processNote'
import { copyNoteFile, processFile } from './processFile'
import { Database } from 'sqlite'
import { MarkdownNote } from '@markdown-memory/markdown'
import { formatISO } from 'date-fns'

// the name of the Bear database file
const sourceFile = 'database.sqlite'
const targetFolder = 'extract-backup'
const targetFile = 'bear-backup.sqlite'

async function processFiles(
  db: Database,
  sourceRoot: string,
  assetsDir: string
): Promise<BearProcessedFile[]> {
  const files = await db.all('SELECT * FROM ZSFNOTEFILE')
  activity(`files: ${files.length}`, 2)
  const processedFiles = files.map(processFile)
  activity(`copying to ${assetsDir}`, 3)
  processedFiles.map((file) => copyNoteFile(file, sourceRoot, assetsDir))
  return processedFiles
}

async function processTags(db: Database) {
  const tags = await db.all('SELECT * FROM ZSFNOTETAG')
  const noteTags = await db.all('SELECT * FROM Z_5TAGS')
  activity(`tags: ${tags.length}`, 2)
  return tags.map((tag) => processTag(tag, noteTags))
}

async function processNotes(
  db: Database,
  tags: BearProcessedTag[]
): Promise<MarkdownNote[] | undefined> {
  const notes = await db.all('SELECT * FROM ZSFNOTE')
  activity(`notes: ${notes.length}`, 2)
  return notes.map((note) => processNote(note, tags))
}

export default async function extract(): Promise<MarkdownNote[] | undefined> {
  header2(`running bear extractor | ${formatISO(new Date())}`)
  const { BEAR_APP_DATA_DIR: sourceRoot, ASSETS_DIR: assetsDir } = loadEnv()
  activity('copy db', 1)
  activity(`${sourceRoot}`, 2)
  doCopy({
    sourceRoot,
    sourceFile,
    targetRoot: '.',
    targetFolder,
    targetFile,
  })
  activity('copy complete', 1)
  const db = await sqliteOpen(`${targetFolder}/bear-backup.sqlite`)
  activity('starting note extraction', 1)
  await processFiles(db, sourceRoot, assetsDir)
  const tags = await processTags(db)
  // TODO: do files need to be included in the note?
  const notes = await processNotes(db, tags)
  activity('note extraction complete', 1)
  return notes
}
