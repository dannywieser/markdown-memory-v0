export type MarkdownLineType =
  | 'blank'
  | 'blockquote'
  | 'codeblock'
  | 'codeboundary'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'unorderedlist'

export type MarkdownTextType = 'code' | 'image' | 'link' | 'string'

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
