import { MarkdownNote } from '@markdown-memory/markdown'

import { isNoteInGroup } from './groups'
import { Group } from './groups.types'

const mockNote = (tags: string[] = []) => {
  return {
    tags,
  } as unknown as MarkdownNote
}

const cases = [
  {
    description:
      'note is not included if there is neither includes nor excludes',
    expected: false,
    group: {},
    tags: ['A', 'B', 'C'],
  },
  {
    description: 'note is included with wildcard include',
    expected: true,
    group: { include: ['*'] },
    tags: ['A', 'B', 'C'],
  },
  {
    description: 'note is included with specific include',
    expected: true,
    group: { include: ['B'] },
    tags: ['A', 'B', 'C'],
  },
  {
    description: 'note is excluded with a global exclude',
    expected: false,
    group: { exclude: ['*'], include: ['D'] },
    tags: ['A', 'B', 'C'],
  },
  {
    description: 'note is excluded with a specific exclude',
    expected: false,
    group: { exclude: ['C'], include: ['*'] },
    tags: ['A', 'B', 'C'],
  },
]

describe('isNoteInGroup', () => {
  test.each(cases)('$description', ({ expected, group, tags }) => {
    const note = mockNote(tags)

    const result = isNoteInGroup(note, group as unknown as Group)

    expect(result).toBe(expected)
  })
})
