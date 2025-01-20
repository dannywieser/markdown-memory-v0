import { MarkdownBody } from '../markdown/types'

export interface BearRawNote {
  Z_PK: string
  ZCREATIONDATE: string
  ZHASFILES: number
  ZHASIMAGES: number
  ZMODIFICATIONDATE: string
  ZSUBTITLE: string
  ZTEXT: string
  ZTITLE: string
  ZUNIQUEIDENTIFIER: string
}

export interface BearRawTag {
  ZTITLE: string
  ZUNIQUEIDENTIFIER: string
}

export interface BearNoteFile {
  filename: string
  folder: string
}

export interface BearProcessedNote {
  body: MarkdownBody
  created: string
  files: BearNoteFile[]
  hasFiles: boolean
  hasImages: boolean
  id: string
  modified: string
  rawText: string
  title: string
}

export interface BearRawFile {
  ZFILENAME: string
  ZNOTE: string
  ZUNIQUEIDENTIFIER: string
}

export interface BearProcessedFile {
  fileId: string
  filename: string
  noteId: string
}
