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
  | 'img'
  | 'p'
  | 'ul'

export type MarkdownTextType =
  | 'bold'
  | 'code'
  | 'italic'
  | 'link'
  | 'src'
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
