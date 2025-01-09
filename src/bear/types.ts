import { MarkdownBody } from '../markdown/types'

export interface BearRawNote {
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

export interface BearProcessedNote {
  body: MarkdownBody
  created: string
  hasFiles: boolean
  hasImages: boolean
  id: string
  modified: string
  rawText: string
  title: string
}
