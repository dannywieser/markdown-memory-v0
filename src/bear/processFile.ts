import { BearProcessedFile, BearRawFile } from './types'

export default function processFile(rawFile: BearRawFile): BearProcessedFile {
  return {
    fileId: rawFile.ZUNIQUEIDENTIFIER,
    filename: rawFile.ZFILENAME,
    noteId: rawFile.ZNOTE,
  }
}
