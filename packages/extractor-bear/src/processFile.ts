import { doCopy } from '@markdown-memory/utilities'

import { BearProcessedFile, BearRawFile } from './types'

export function processFile(rawFile: BearRawFile): BearProcessedFile {
  return {
    fileId: rawFile.ZUNIQUEIDENTIFIER,
    filename: rawFile.ZFILENAME,
    noteId: rawFile.ZNOTE,
  }
}

const bearImagesDir = `Local Files/Note Images`
const bearFilesDir = `Local Files/Note Files`

export function copyNoteFile(
  { fileId, filename }: BearProcessedFile,
  bearRoot: string,
  assetDir: string
) {
  const imagesDir = `${bearRoot}/${bearImagesDir}/${fileId}`
  const filesDir = `${bearRoot}/${bearFilesDir}/${fileId}`

  const copyConfig = {
    sourceFile: filename,
    sourceRoot: imagesDir,
    targetFile: filename,
    targetFolder: fileId,
    targetRoot: assetDir,
  }

  try {
    // first we try to copy from the images folder
    doCopy(copyConfig)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    // first failure, try to copy from the files folder
    try {
      doCopy({
        ...copyConfig,
        sourceRoot: filesDir,
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      // console.error(`failed to copy file ${fileId}/${filename}`)
      // TODO: what are these errors?
    }
  }
}
