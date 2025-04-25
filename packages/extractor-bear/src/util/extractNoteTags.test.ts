import { BearProcessedTag } from '../types'
import extractNoteTags from './extractNoteTags'
const allTags = [
  { noteIds: [1, 2, 3, 4, 5], title: 'tagA' },
  { noteIds: [3, 4, 5, 6, 7], title: 'tagB' },
  { noteIds: [10, 11, 12], title: 'tagC' },
] as BearProcessedTag[]

describe('the extractNoteTags utility', () => {
  test('empty array is returned if no tags are associated with the given note', () => {
    const tags = extractNoteTags(20, allTags)
    expect(tags).toEqual([])
  })

  test('matches tags linked to a given note ID', () => {
    const tags = extractNoteTags(3, allTags)
    expect(tags).toEqual(['tagA', 'tagB'])
  })

  test('handles cases where no tags have been found at all', () => {
    const tags = extractNoteTags(3, [])
    expect(tags).toEqual([])
  })
})
