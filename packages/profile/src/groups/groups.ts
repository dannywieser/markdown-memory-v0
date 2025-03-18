import { Group } from './groups.types'

export function loadGroups(): Group[] {
  return [
    {
      name: 'personal',
      exclude: ['riverside', 'daily@work'],
    },
    {
      name: 'work',
      include: ['riverside', 'daily@work'],
    },
  ]
}
