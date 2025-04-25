import { BearRawNote } from '../types'
import handleWikiLinks from './handleWikiLinks'

const allNotes = [
  { ZTITLE: 'linka', ZUNIQUEIDENTIFIER: 'linka-id' },
  { ZTITLE: 'linkb', ZUNIQUEIDENTIFIER: 'linkb-id' },
  { ZTITLE: 'linkc', ZUNIQUEIDENTIFIER: 'linkc-id' },
  { ZTITLE: 'linkd', ZUNIQUEIDENTIFIER: 'linkd-id1' },
  { ZTITLE: 'linkd', ZUNIQUEIDENTIFIER: 'linkd-id2' },
]
describe('the handleWikiLinks function', () => {
  const cases = [
    {
      allNotes: [],
      description: 'raw text has no wikilinks',
      expected: 'this is a string',
      rawNote: 'this is a string',
    },
    {
      allNotes,
      description:
        'raw text with single wikilink that has a single matched note',
      expected:
        'this is a text with embedded [linka](/note/linka-id) and some more text after',
      rawNote:
        'this is a text with embedded [[linka]] and some more text after',
    },
    {
      allNotes,
      description: 'raw text with multiple wikilinks that have matched notes',
      expected:
        '[linka](/note/linka-id), [linkb](/note/linkb-id), [linkc](/note/linkc-id)',
      rawNote: '[[linka]], [[linkb]], [[linkc]]',
    },
    {
      allNotes,
      description:
        'raw text has wikilink with no matched note - wikilink is left as is',
      expected: '[[invalid]]',
      rawNote: '[[invalid]]',
    },
    {
      allNotes,
      description:
        'raw text has wikilink with no matched note - wikilink is left as is',
      expected: '[[invalid]]',
      rawNote: '[[invalid]]',
    },
    {
      allNotes,
      description:
        'rawtext has wikilink with multiple matching notes - first note is linked',
      expected: '[linkd](/note/linkd-id1)',
      rawNote: '[[linkd]]',
    },
  ]

  test.each(cases)('$description', ({ allNotes, expected, rawNote }) => {
    const result = handleWikiLinks(rawNote, allNotes as BearRawNote[])
    expect(result).toEqual(expected)
  })
})
