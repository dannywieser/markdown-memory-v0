import { debug } from '../utils'
import {
  MarkdownBody,
  MarkdownLine,
  MarkdownLineType,
  MarkdownText,
} from './types'

const types = {
  blockquote: '> ',
  codeboundary: '```',
  h1: '# ',
  h2: '## ',
  h3: '### ',
  h4: '#### ',
  h5: '##### ',
  h6: '###### ',
  unorderedlist: '* ',
}

const hasExternalLink = (text: string) => {
  // first, let's find a [ ] pairing, if it exists.
  const linkStart = text.indexOf('[')
  const linkEnd = text.indexOf(']', linkStart)

  // we want to ignore internal links, with a double [[
  const linkStartNext = text.substring(linkStart + 1)
  const isInternalLink = linkStartNext === '['

  // next, we want to ignore other [] pairings that aren't immediately followed by an href []()
  const linkEndNext = text.substring(linkEnd + 1)
  const isExternalLink = linkEndNext === '('

  return linkStart && linkEnd && !isInternalLink && isExternalLink
}

const processText = (text: string): MarkdownText[] => {
  const segments: MarkdownText[] = []

  let processText = text
  // extract link
  // TODO: this can really be optimized!
  while (hasExternalLink(text)) {
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
  // TODO: text segment for `` markers
  // TODO: text segment for bold, italic, striketrhough

  // push any remaining text into segments as normal text
  if (processText.length > 0) {
    segments.push({ text, type: 'string' })
  }
  return segments
}

const createMarkDownLine = (
  line: string,
  inCodeBlock: boolean
): MarkdownLine => {
  if (inCodeBlock && !line.startsWith(types.codeboundary)) {
    const textSegments: MarkdownText[] = [{ text: line, type: 'code' }]
    return { textSegments, type: 'codeblock' }
  }

  // TODO: images
  // TODO: todo items
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
  let inCodeBlock = false
  lines.forEach((line: string) => {
    if (line) {
      const mdLine = createMarkDownLine(line, inCodeBlock)
      if (mdLine.type === 'codeboundary') {
        inCodeBlock = !inCodeBlock
        debug(`code boundary: ${inCodeBlock ? 'start' : 'end'}`)
      }
      processedLines.push(mdLine)
    }
  })
  //console.log(JSON.stringify(processedLines, null, 2))
  return {
    lines: processedLines,
  }
}
