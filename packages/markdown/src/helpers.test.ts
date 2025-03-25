import { getRawNoteText } from './helpers'
import { MarkdownNote } from './types'

const fakeTokens = [{ raw: 'a' }, { raw: 'b' }, { raw: 'c' }]
const createFakeNote = (tokens = fakeTokens) => {
  return { tokens } as MarkdownNote
}

describe('getRawNoteText', () => {
  test('joins all text from tokens in a note', () => {
    const note = createFakeNote()

    const rawText = getRawNoteText(note)

    expect(rawText).toEqual('abc')
  })

  test('no errors if note tokens are empty', () => {
    const note = createFakeNote([])

    const rawText = getRawNoteText(note)

    expect(rawText).toEqual('')
  })

  test('no errors if note is undefined', () => {
    const rawText = getRawNoteText(undefined as unknown as MarkdownNote)
    expect(rawText).toEqual('')
  })
})
