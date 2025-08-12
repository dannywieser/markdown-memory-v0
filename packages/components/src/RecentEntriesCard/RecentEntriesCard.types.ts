import { Stats } from '@markdown-memory/services'

export interface RecentEntriesCardProps {
  days: number
  stats: Stats
  type: RecentEntryType
}

export type RecentEntryType = 'created' | 'modified'
