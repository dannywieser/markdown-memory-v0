export type MarkdownLineType =
  | 'blank'
  | 'blockquote'
  | 'codebody'
  | 'codeend'
  | 'codestart'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'ul'

export type MarkdownTextType =
  | 'bold'
  | 'code'
  | 'image'
  | 'italic'
  | 'link'
  | 'string'

export interface MarkdownText {
  href?: string
  text: string
  type: MarkdownTextType
}

export interface MarkdownLine {
  textSegments: MarkdownText[]
  type: MarkdownLineType
}

export interface MarkdownBody {
  lines: MarkdownLine[]
}
