import { debug } from '../utils'
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
  unorderedlist: '* ',
}

const specialChars = '`[]()*'
// const codeBlockComplete = '``````'
// const linkTitleComplete = '[]'
// const linkComplete = '[]()'

function processText(lineArr: string[]): MarkdownText[] {
  // this is an array of the located text segments
  const segments: MarkdownText[] = []

  // this stack holds current pending special text (i.e. link title/href)
  let specialText: string[] = []

  // this stack holds current text
  let textStack: string[] = []

  let specialStack: string[] = []

  const resetText = () => {
    textStack = []
  }

  const resetAll = () => {
    specialText = []
    textStack = []
    specialStack = []
  }

  // push current text stack as a string into the specialText stack
  const pushSpecialText = () => {
    if (textStack.length > 0) {
      specialText.push(textStack.join(''))
      resetText()
    }
  }

  const pushSegment = (segment: MarkdownText) => {
    segments.push(segment)
    resetAll()
  }

  const pushText = () => {
    if (textStack.length > 0) {
      pushSegment({
        text: textStack.join(''),
        type: 'string',
      })
    }
  }

  lineArr.forEach((curChar) => {
    if (specialChars.includes(curChar)) {
      if (specialStack.length > 0) {
        pushSpecialText()
      } else {
        pushText()
      }
      specialStack.push(curChar)
    }

    // link
    if (specialStack.join('') === '[]()') {
      pushSegment({
        href: specialText[1],
        text: specialText[0],
        type: 'link',
      })
    }

    // code
    if (specialStack.join('') === '``' && specialText.length > 0) {
      pushSegment({
        text: specialText[0],
        type: 'code',
      })
    }

    // bold
    if (specialStack.join('') === '****' && specialText.length > 0) {
      pushSegment({
        text: specialText[0],
        type: 'bold',
      })
    }

    // italic
    if (specialStack.join('') === '**' && specialText.length > 0) {
      pushSegment({
        text: specialText[0],
        type: 'italic',
      })
    }

    // normal char, add to current text stack
    if (!specialChars.includes(curChar)) {
      textStack.push(curChar)
    }
  })
  pushText()

  return segments
}

function createMarkDownLine(line: string): MarkdownLine {
  // TODO - determine line type (via startsWith)
  const textSegments = processText(line.split(''))

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
