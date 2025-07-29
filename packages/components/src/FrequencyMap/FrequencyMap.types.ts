import type { DateMap } from '@markdown-memory/services'

export interface FrequencyMapItemProps {
  createdCount: number
  date: string
  modifiedCount: number
}

export interface FrequencyMapProps {
  dateMap: DateMap
}
