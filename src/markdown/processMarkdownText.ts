import { BearNoteFile } from 'bear/types'

import { MarkdownLineType, MarkdownText, MarkdownTextType } from './types'

const specialChars = '`[]()*#_'

const mapping = (type: MarkdownTextType, text: string, href?: string) => ({
  href,
  text,
  type,
})

// normal brackets around text, or the path to an image
const parensHandler = (
  textArr: string[],
  type: MarkdownLineType,
  files: BearNoteFile[]
) => {
  const lineText = textArr[0]
  let imagePath = ''
  if (type === 'img' && files) {
    const { folder = '' } =
      files.find(({ filename }) => filename === textArr[0]) ?? {}
    imagePath = `${folder}/${lineText}`
  }
  return mapping(
    type === 'img' ? 'src' : 'string',
    type === 'img' ? imagePath : `(${lineText})`
  )
}

const patterns = {
  __: (textArr: string[]) => mapping('italic', textArr[0]),
  '#': (textArr: string[]) => mapping('tag', textArr[0]),
  '()': parensHandler,
  '**': (textArr: string[]) => mapping('italic', textArr[0]),
  '****': (textArr: string[]) => mapping('bold', textArr[0]),
  '[[]]': (textArr: string[]) => mapping('internallink', textArr[0]),
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
  files: BearNoteFile[],
  type: MarkdownLineType = 'p'
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

  const checkSpecial = (curChar: string) => {
    if (specialStack.length === 0) {
      return
    }
    // special handling for tags
    if (
      (curChar === ' ' || curChar === '\n') &&
      specialStack.join('') === '#'
    ) {
      pushSegment(mapping('tag', textStack.join('')))
      return
    }
    for (const [pattern, mapper] of Object.entries(patterns)) {
      if (specialStack.join('') === pattern && specialText.length > 0) {
        // console.log(`pushing special: ${specialText.join('')}, |${pattern}<--`)
        pushSegment(mapper(specialText, type, files))
        return
      }
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

    checkSpecial(curChar)

    // normal char, add to current text stack
    if (!specialChars.includes(curChar)) {
      textStack.push(curChar)
    }
  })
  // We have reached the end of the line and the special stack is not empty.
  // This means we have a special string which has ended and needs to be closed
  if (specialStack.join('').trim().length > 0) {
    checkSpecial('\n')
  } else {
    pushText()
  }

  return segments
}
