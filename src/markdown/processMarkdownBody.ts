import { debug } from '../utils'
import processMarkdownText from './processMarkdownText'
import { MarkdownBody, MarkdownLine } from './types'

const types = {
  blockquote: '> ',
  codeblock: '```',
  h1: '# ',
  h2: '## ',
  h3: '### ',
  h4: '#### ',
  h5: '##### ',
  h6: '###### ',
  unorderedlist: '* ',
}

function createMarkDownLine(line: string): MarkdownLine {
  // TODO - determine line type (via startsWith)
  const textSegments = processMarkdownText(line.split(''))

  return {
    textSegments,
    type: 'p',
  }
}

export default function processMarkdownBody(rawLines: string): MarkdownBody {
  const lines = rawLines.split('\n')
  const processedLines: MarkdownLine[] = []
  //const textSegments: MarkdownText[] = []
  lines.forEach((line: string) => {
    if (line) {
      const mdLine = createMarkDownLine(line)
      console.log(mdLine)
      // if (mdLine) {
      //   processedLines.push(mdLine)
      // }
    }
  })
  // console.log(JSON.stringify(processedLines, null, 2))
  return {
    lines: processedLines,
  }
}
