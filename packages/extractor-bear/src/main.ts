import { loadEnv, doCopy, header2, activity } from '@markdown-memory/utilities'

// the name of the Bear database file
const sourceFile = 'database.sqlite'
const targetFolder = 'extract-backup'

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
    targetFile: 'bear-backup.sqlite',
  })
  activity('. copy complete')
}
