export interface BearRawNote {
  Z_PK: number
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
  body: unknown
  created: string
  files: BearNoteFile[]
  hasFiles: boolean
  hasImages: boolean
  id: string
  modified: string
  rawText: string
  tags: string[]
  title: string
}

export interface BearRawFile {
  ZFILENAME: string
  ZNOTE: number
  ZUNIQUEIDENTIFIER: string
}

export interface BearProcessedFile {
  fileId: string
  filename: string
  noteId: number
}

export interface BearNoteTagRel {
  Z_5NOTES: number
  Z_13TAGS: number
}

export interface BearRawTag {
  Z_PK: number
  ZTAGCON: string
  ZTITLE: string
}

export interface BearProcessedTag {
  icon: string
  noteIds: number[]
  title: string
}
