import * as fs from 'fs'

import { currentDate, error, info } from '../utils'

const sourceFile =
  '/Users/dgw/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/database.sqlite'

const destDir = './db-backup'

export default function copyBearDatabase(): string {
  const date = currentDate()
  const destFile = `${destDir}/${date}.sqllite`
  try {
    fs.copyFileSync(sourceFile, destFile, fs.constants.COPYFILE_EXCL)
    info(`db copied to: ${destFile}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error('copy failed, file already exists')
  }
  return destFile
}
