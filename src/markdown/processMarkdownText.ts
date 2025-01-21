import { BearNoteFile } from 'bear/types'
import { text } from 'stream/consumers'

import { MarkdownText, MarkdownTextType } from './types'

const specialChars = '`[]()*!'

const mapping = (type: MarkdownTextType, text: string, href?: string) => ({
  href,
  text,
  type,
})

const patterns = {
  '![]()': (textArr: string[], files: BearNoteFile[]) => {
    let filename = textArr[0]
    if (files) {
      const { folder = '' } =
        files.find(({ filename }) => filename === textArr[0]) ?? {}
      filename = `${folder}/${textArr[0]}`
    }
    console.log(`filename: ${filename}`)
    return mapping('image', filename)
  },
  '()': (textArr: string[]) => mapping('string', `(${textArr[0]})`), // normal brackets around text
  '**': (textArr: string[]) => mapping('italic', textArr[0]),
  '****': (textArr: string[]) => mapping('bold', textArr[0]),
  '[]()': (textArr: string[]) => mapping('link', textArr[0], textArr[1]),
  '``': (textArr: string[]) => mapping('code', textArr[0]),
}

const joinText = (textArr: string[]): string => {
  const joined = textArr.join('')
  return joined
    .replaceAll('\\.', '.')
    .replaceAll('\\!', '.')
    .replaceAll('\\-', '-')
    .replaceAll('\\#', '')
    .replaceAll('\\(', '(')
    .replaceAll('\\+', '+')
}

export default function processMarkdownText(
  lineArr: string[],
  files: BearNoteFile[]
): MarkdownText[] {
  // this is an array of the located text segments
  const segments: MarkdownText[] = []
  // this stack holds current text
  let textStack: string[] = []
  // this stack holds the current special characters
  let specialStack: string[] = []
  // this stack holds current pending special text (i.e. link title/href)
  let specialText: string[] = []

  // push current text stack as a string into the specialText stack
  const pushSpecialText = () => {
    if (textStack.length > 0) {
      specialText.push(joinText(textStack))
      textStack = []
    }
  }

  const pushSegment = (segment: MarkdownText) => {
    segments.push(segment)
    specialText = []
    textStack = []
    specialStack = []
  }

  const pushText = () => {
    if (textStack.length > 0) {
      pushSegment(mapping('string', joinText(textStack)))
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

    for (const [pattern, mapper] of Object.entries(patterns)) {
      if (specialStack.join('') === pattern && specialText.length > 0) {
        pushSegment(mapper(specialText, files))
        return
      }
    }

    // normal char, add to current text stack
    if (!specialChars.includes(curChar)) {
      textStack.push(curChar)
    }
  })
  pushText()

  return segments
}
