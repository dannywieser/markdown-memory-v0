import { MarkdownNote } from '@markdown-memory/markdown'

import { Group } from './groups.types'

export const ALL = '*'

export function loadGroups(): Group[] {
  return [
    {
      name: 'personal',
      include: ['*'],
      exclude: ['riverside', 'daily@work'],
    },
    {
      name: 'work',
      include: ['riverside', 'daily@work'],
    },
  ]
}

export const isNoteInGroup = (
  note: MarkdownNote,
  { include, exclude }: Group
) => {
  const { tags } = note

  const globalInclude = include && include.includes(ALL)
  const specificInclude = tags.some((tag) => include && include.includes(tag))

  // A specific include always overrides any exclude. In most cases, this is used to include specific notes and exclude all others.
  const shouldExclude =
    !specificInclude &&
    tags.some(
      (tag) => exclude && (exclude.includes(tag) || exclude.includes('*'))
    )
  return (globalInclude || specificInclude) && !shouldExclude
}
