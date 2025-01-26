import * as fs from 'fs'

import { currentDate, error, info } from '../utils'

const bearDir =
  '/Users/dgw/Library/Group Containers/9K33E3U3T4.net.shinyfrog.bear/Application Data'
const sourceFile = `${bearDir}/database.sqlite`
const imagesDir = `${bearDir}/Local Files/Note Images`
const filesDir = `${bearDir}/Local Files/Note Files`

const destDbDir = './db-backup'
const destImagesDir = './public/images'

export function copyBearDatabase(): string {
  const date = currentDate()
  const destFile = `${destDbDir}/${date}.sqllite`
  try {
    fs.copyFileSync(sourceFile, destFile)
    info(`db copied to: ${destFile}`)
  } catch (e) {
    error('copy failed')
    console.error(e)
  }
  return destFile
}

export function copyNoteImage(filename: string, folder: string) {
  try {
    // first we try to copy from the images folder
    doCopy(imagesDir, folder, filename)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // first failure, try to copy from the files folder
    doCopy(filesDir, folder, filename)
  }
}

const doCopy = (sourceDir: string, folder: string, filename: string) => {
  const source = `${sourceDir}/${folder}/${filename}`
  const destDir = `${destImagesDir}/${folder}`
  const destFile = `${destDir}/${filename}`
  const exists = fs.existsSync(destFile)
  if (!exists) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir)
    }
    fs.copyFileSync(source, destFile)
  }
}
