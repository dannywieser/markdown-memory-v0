import { MarkdownNote } from '@markdown-memory/markdown'

import { Group } from './groups.types'

export const ALL = '*'

export function loadGroups(): Group[] {
  return [
    {
      exclude: ['riverside', 'daily@work', 'development', 'downtime'],
      include: ['*'],
      name: 'personal',
    },
    {
      include: ['riverside', 'daily@work'],
      name: 'work',
    },
    {
      include: ['development'],
      name: 'development',
    },
    {
      include: ['downtime'],
      name: 'downtime',
    },
  ]
}

export const getAllGroupNames = () =>
  loadGroups().reduce<string[]>(
    (allGroupNames, { name }: Group) => [name, ...allGroupNames],
    []
  )

export const isNoteInGroup = (
  note: MarkdownNote,
  { exclude, include }: Group
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
