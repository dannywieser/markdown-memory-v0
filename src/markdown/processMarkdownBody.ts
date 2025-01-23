import { BearNoteFile } from 'bear/types'

import processMarkdownText from './processMarkdownText'
import {
  MarkdownBody,
  MarkdownLine,
  MarkdownLineType,
  MarkdownText,
} from './types'

const types = {
  blockquote: '> ',
  codeblock: '```',
  h1: '# ',
  h2: '## ',
  h3: '### ',
  h4: '#### ',
  h5: '##### ',
  h6: '###### ',
  img: '![]',
  tag: '#',
  todo: '- [ ]',
  tododone: '- [x]',
  ul: '* ',
}

let inCodeBlock = false

const processType = (type: string): MarkdownLineType => {
  if (type === 'codeblock') {
    if (!inCodeBlock) {
      inCodeBlock = true
      return 'codestart'
    } else {
      inCodeBlock = false
      return 'codeend'
    }
  } else {
    return type as MarkdownLineType
  }
}

function createMarkDownLine(line: string, files: BearNoteFile[]): MarkdownLine {
  for (const [typeKey, typeValue] of Object.entries(types)) {
    if (line.startsWith(typeValue)) {
      const textArr = line.replace(typeValue, '').split('')
      const type = processType(typeKey)
      const textSegments = processMarkdownText(textArr, files, type)
      return { textSegments, type }
    }
  }

  if (inCodeBlock) {
    const textSegments: MarkdownText[] = [{ text: line, type: 'code' }]
    return { textSegments, type: 'pre' }
  }

  if (line.trim().length === 0) {
    return { textSegments: [], type: 'blank' }
  }

  const textSegments = processMarkdownText(line.trim().split(''), files)
  return { textSegments, type: 'p' }
}

export default function processMarkdownBody(
  rawLines: string,
  files: BearNoteFile[]
): MarkdownBody {
  const lines = rawLines.split('\n')
  const processedLines: MarkdownLine[] = []

  lines.forEach((line: string) => {
    const mdLine = createMarkDownLine(line, files)
    if (mdLine) {
      processedLines.push(mdLine)
    }
  })
  return {
    lines: processedLines,
  }
}
