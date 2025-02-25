import {
  loadEnv,
  doCopy,
  header2,
  activity,
  sqliteOpen,
} from '@markdown-memory/utilities'
import { BearProcessedFile, BearProcessedNote } from './types'
import processTags from './processTags'
import processNote from './processNote'
import { copyNoteFile, processFile } from './processFile'
import { Database } from 'sqlite'

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
  activity(`.. files: ${files.length}`)
  const processedFiles = files.map(processFile)
  activity(`... copying to ${assetsDir}`)
  processedFiles.map((file) => copyNoteFile(file, sourceRoot, assetsDir))
  return processedFiles
}

async function processNotes(
  db: Database,
  files: BearProcessedFile[]
): Promise<BearProcessedNote[] | undefined> {
  try {
    const notes = await db.all('SELECT * FROM ZSFNOTE')
    const tags = await db.all('SELECT * FROM ZSFNOTETAG')
    const noteTags = await db.all('SELECT * FROM Z_5TAGS')

    activity(`.. tags:  ${tags.length}`)
    const processedTags = tags.map((tag) => processTags(tag, noteTags))

    activity(`.. notes: ${notes.length}`)
    return notes.map((note) => processNote(note, files, processedTags))
  } catch (e) {
    console.error('failed to read DB', e)
  }
  return undefined
}

export default async function extract() {
  header2('running bear extractor')
  const { BEAR_APP_DATA_DIR: sourceRoot, ASSETS_DIR: assetsDir } = loadEnv()
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
  const db = await sqliteOpen(`${targetFolder}/bear-backup.sqlite`)
  activity('. starting note extraction')
  const files = await processFiles(db, sourceRoot, assetsDir)
  const notes = await processNotes(db, files)
  activity('. note extraction complete')
}
