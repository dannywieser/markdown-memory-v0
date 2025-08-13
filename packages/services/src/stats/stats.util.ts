import { DateMap } from './stats.types'

export function getRecentDateEntries(dateMap: DateMap, days: number) {
  return Object.entries(dateMap)
    .sort((a, b) => b[0].localeCompare(a[0])) // Sort by date string descending
    .slice(0, days)
    .map(([dateStr, data]) => ({
      dateStr,
      ...data,
    }))
}

export function getTotalsForEntries(
  entries: Array<{ createdCount: number; modifiedCount: number }>
) {
  return entries.reduce(
    (totals, entry) => {
      totals.created += entry.createdCount || 0
      totals.modified += entry.modifiedCount || 0
      return totals
    },
    { created: 0, modified: 0 }
  )
}

export function getTrailingDateEntries(
  dateMap: DateMap,
  startDaysAgo: number,
  endDaysAgo: number
) {
  return Object.entries(dateMap)
    .sort((a, b) => b[0].localeCompare(a[0])) // Sort by date string descending
    .slice(startDaysAgo, endDaysAgo)
    .map(([dateStr, data]) => ({
      dateStr,
      ...data,
    }))
}
