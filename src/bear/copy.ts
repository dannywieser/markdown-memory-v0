import { format } from 'date-fns'
import * as fs from 'fs'
import { error, info } from '../utils'

const sourceFile =
  '/Users/dgw/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data/database.sqlite'

const destDir = './db-backup'

export default function copyBearDatabase() {
  const currentDate = format(new Date(), 'yyyy.MM.dd')
  const destFile = `${destDir}/${currentDate}.sqllite`
  fs.copyFile(sourceFile, destFile, fs.constants.COPYFILE_EXCL, (err) => {
    if (err) {
      error('copy failed, file already exists')
    } else {
      info(`copied: ${destFile}`)
    }
  })
}
