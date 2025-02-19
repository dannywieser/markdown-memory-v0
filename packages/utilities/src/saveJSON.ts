import * as fs from 'fs'

import { error } from './log'

export function saveJSON(destFile: string, contents: string) {
  try {
    fs.writeFileSync(destFile, contents)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    error('failed to create JSON')
  }
}
