import * as fs from 'fs'

export function saveJSON(destFile: string, contents: string) {
  try {
    fs.writeFileSync(destFile, contents)
  } catch (e) {
    console.error('failed to create JSON', e)
  }
}
