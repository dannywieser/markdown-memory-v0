import * as fs from 'fs'

import { currentDate, error, info } from '../utils'

const destDir = './public/daily-extracts'

export function dailyJSON(contents: string) {
  const date = currentDate()
  const destFile = `${destDir}/${date}.json`
  try {
    fs.writeFileSync(destFile, contents, 'utf8')
    info(`daily JSON created: ${destFile}`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error('failed to create JSON')
  }
}
