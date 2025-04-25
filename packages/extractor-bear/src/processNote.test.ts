import { lexer } from '@markdown-memory/markdown'
import { asMock } from '@markdown-memory/testing-support'
import { convertDate } from '@markdown-memory/utilities'

import processNote from './processNote'
import { BearProcessedFile, BearProcessedTag, BearRawNote } from './types'
import { generateExternalUrl } from './util'
import extractNoteTags from './util/extractNoteTags'
import fixImagePaths from './util/fixImagePaths'

jest.mock('./util')
jest.mock('./util/extractNoteTags')
jest.mock('./util/fixImagePaths')
jest.mock('@markdown-memory/utilities')
jest.mock('@markdown-memory/markdown')

const rawNote = {
  Z_PK: 123456,
  ZCREATIONDATE: 'createDate',
  ZMODIFICATIONDATE: 'modificationDate',
  ZTEXT: 'noteText',
  ZTITLE: 'noteTitle',
  ZUNIQUEIDENTIFIER: 'noteUniqueID',
} as BearRawNote

describe('the processNote function', () => {
  beforeEach(() => {
    asMock(generateExternalUrl).mockImplementation(
      (noteUniqueId: string) => `generateExternalUrl${noteUniqueId}`
    )
    asMock(convertDate).mockImplementation(
      (date: string) => `convertDate${date}`
    )
    asMock(extractNoteTags).mockReturnValue('tags')
    asMock(lexer).mockReturnValue('lexerResult')
  })
  test('mapping of the raw note to Markdown Note', () => {
    const result = processNote(rawNote, [], [])
    expect(result).toEqual({
      created: `convertDate${rawNote.ZCREATIONDATE}`,
      externalUrl: `generateExternalUrl${rawNote.ZUNIQUEIDENTIFIER}`,
      id: rawNote.ZUNIQUEIDENTIFIER,
      modified: `convertDate${rawNote.ZMODIFICATIONDATE}`,
      source: 'bear',
      tags: 'tags',
      title: rawNote.ZTITLE,
      tokens: 'lexerResult',
    })
  })
  test('invokes extractNoteTags with the correct values', () => {
    const tags = [{ noteIds: [1, 2, 3, 4], title: 'foo' }] as BearProcessedTag[]
    processNote(rawNote, tags, [])
    expect(extractNoteTags).toHaveBeenCalledWith(rawNote.Z_PK, tags)
  })

  test('filters the note files array based on the current notes primary key', () => {
    const files = [
      { noteId: 1 },
      { noteId: 2 },
      { noteId: 123456 },
    ] as BearProcessedFile[]
    processNote(rawNote, [], files)
    expect(fixImagePaths).toHaveBeenCalledWith(rawNote.ZTEXT, [
      { noteId: 123456 },
    ])
  })
})
