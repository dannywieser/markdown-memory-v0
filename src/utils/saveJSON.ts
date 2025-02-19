import * as fs from 'fs'

import { error } from '../utils'

export function saveJSON(destFile: string, contents: string) {
  try {
    fs.writeFileSync(destFile, contents)
  } catch (e) {
    error('failed to create JSON')

    console.log(e)
  }
}
