import {
  MarkdownBody,
  MarkdownLine,
  MarkdownLineType,
  MarkdownText,
} from './types'

const types = {
  blockquote: '> ',
  h1: '# ',
  h2: '## ',
  h3: '### ',
  h4: '#### ',
  h5: '##### ',
  h6: '###### ',
  unorderedlist: '* ',
}

const processText = (text: string): MarkdownText[] => {
  const segments: MarkdownText[] = []

  let processText = text
  // extract link
  // TODO: this can really be optimized!
  while (processText.includes('[')) {
    const startTitle = text.indexOf('[')
    const endTitle = text.indexOf(']')
    const startHref = endTitle + 1
    const endHref = text.indexOf(')', startHref)

    const linkTitle = text.substring(startTitle + 1, endTitle)
    const href = text.substring(startHref + 1, endHref)
    processText = processText.substring(endHref + 1)
    segments.push({
      href,
      text: linkTitle,
      type: 'link',
    })
  }

  // TODO: remove inline tags, and if that is all there is on a line, remove the line completely

  // push any remaining text into segments as normal text
  if (processText.length > 0) {
    segments.push({ text, type: 'string' })
  }
  return segments
}

const createMarkDownLine = (line: string): MarkdownLine => {
  for (const [typeKey, typeValue] of Object.entries(types)) {
    if (line.startsWith(typeValue)) {
      const text = line.replace(typeValue, '')
      const textSegments = processText(text)
      return { textSegments, type: typeKey as MarkdownLineType }
    }
  }

  if (line.trim().length === 0) {
    return { textSegments: [{ text: '', type: 'string' }], type: 'blank' }
  }

  const textSegments = processText(line.trim())
  return { textSegments, type: 'p' }
}

export default function processMarkdownBody(rawLines: string): MarkdownBody {
  const lines = rawLines.split('\n')
  const processedLines: MarkdownLine[] = []
  lines.forEach((line: string) => {
    if (line) {
      processedLines.push(createMarkDownLine(line))
    }
  })
  //console.log(JSON.stringify(processedLines, null, 2))
  return {
    lines: processedLines,
  }
}
