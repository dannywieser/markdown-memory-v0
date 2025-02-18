export type MarkdownLineType =
  | 'blank'
  | 'blockquote'
  | 'codeend'
  | 'codestart'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'img'
  | 'p'
  | 'pre'
  | 'ul'

export type MarkdownTextType =
  | 'bold'
  | 'code'
  | 'internallink'
  | 'italic'
  | 'link'
  | 'src'
  | 'string'
  | 'tag'

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
