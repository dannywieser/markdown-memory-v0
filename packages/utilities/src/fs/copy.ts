import * as fs from 'fs'

import { CopyProps } from './types'

/**
 * Given a set of properties, copy a file from one location to another.
 * If the provided destination directory does not exist, it will be created.
 */
export function doCopy({
  sourceFile,
  sourceRoot,
  targetFile,
  targetFolder,
  targetRoot,
}: CopyProps) {
  const source = `${sourceRoot}/${sourceFile}`
  const destDir = `${targetRoot}/${targetFolder}`
  const destFile = `${destDir}/${targetFile}`
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir)
  }
  //try {
  fs.copyFileSync(source, destFile)
  //} catch (e) {
  //   console.error(e)
  // }
}
