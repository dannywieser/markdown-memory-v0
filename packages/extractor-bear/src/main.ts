import { loadEnv, doCopy } from '@markdown-memory/utilities'

// the name of the Bear database file
const sourceFile = 'database.sqlite'
const targetFolder = 'extract-backup'

export default async function extract() {
  console.info('  --- Bear Extractor ---')
  const { BEAR_APP_DATA_DIR: sourceRoot } = loadEnv()
  console.info(`   - copying Bear database from:  ${sourceRoot}`)
  doCopy({
    sourceRoot,
    sourceFile,
    targetRoot: '.',
    targetFolder,
    targetFile: 'bear-backup.sqlite',
  })
}
