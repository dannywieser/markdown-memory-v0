import * as fs from 'fs'

export function saveJSON(destFile: string, contents: string) {
  try {
    fs.writeFileSync(destFile, contents)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    console.error('failed to create JSON')
  }
}
