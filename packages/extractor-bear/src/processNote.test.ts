import { lexer } from '@markdown-memory/markdown'
import { asMock } from '@markdown-memory/testing-support'
import { convertDate } from '@markdown-memory/utilities'

import processNote from './processNote'
import { BearProcessedFile, BearProcessedTag, BearRawNote } from './types'
import {
  extractNoteTags,
  fixImagePaths,
  generateExternalUrl,
  handleWikiLinks,
} from './util'

jest.mock('./util')
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

const allNotes: BearRawNote[] = []
const allTags: BearProcessedTag[] = []
const matchedFiles = [
  {
    fileId: '123456a',
    filename: '123456a.jpg',
    noteId: 123456,
  },
  {
    fileId: '123456b',
    filename: '123456b.jpg',
    noteId: 123456,
  },
]
const allFiles: BearProcessedFile[] = [
  ...matchedFiles,
  {
    fileId: '2',
    filename: '2.jpg',
    noteId: 2,
  },
]

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
  test('mapping of the raw note and related images to a Markdown Note', () => {
    const result = processNote(rawNote, allNotes, allTags, allFiles)
    expect(result).toEqual({
      created: `convertDate${rawNote.ZCREATIONDATE}`,
      externalUrl: `generateExternalUrl${rawNote.ZUNIQUEIDENTIFIER}`,
      id: rawNote.ZUNIQUEIDENTIFIER,
      imagePaths: ['123456a/123456a.jpg', '123456b/123456b.jpg'],
      modified: `convertDate${rawNote.ZMODIFICATIONDATE}`,
      source: 'bear',
      tags: 'tags',
      title: rawNote.ZTITLE,
      tokens: 'lexerResult',
    })
  })
  test('invokes extractNoteTags with the correct values', () => {
    const tags = [{ noteIds: [1, 2, 3, 4], title: 'foo' }] as BearProcessedTag[]
    processNote(rawNote, allNotes, tags, allFiles)
    expect(extractNoteTags).toHaveBeenCalledWith(rawNote.Z_PK, tags)
  })

  test('raw text is passed through fixImagePaths and then handleWikiLinks', () => {
    asMock(fixImagePaths).mockReturnValue('textFromFixImages')

    processNote(rawNote, allNotes, allTags, allFiles)

    // only the files mapped to the current note are passed into this function
    expect(fixImagePaths).toHaveBeenCalledWith(rawNote.ZTEXT, matchedFiles)
    expect(handleWikiLinks).toHaveBeenCalledWith('textFromFixImages', allNotes)
  })

  test('filters the note files array based on the current notes primary key', () => {
    const files = [
      { noteId: 1 },
      { noteId: 2 },
      { noteId: 123456 },
    ] as BearProcessedFile[]
    processNote(rawNote, allNotes, allTags, files)
    expect(fixImagePaths).toHaveBeenCalledWith(rawNote.ZTEXT, [
      { noteId: 123456 },
    ])
  })
})
