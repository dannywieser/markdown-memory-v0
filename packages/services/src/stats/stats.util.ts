import { differenceInCalendarDays, parse } from 'date-fns'

import { DateMap } from './stats.types'

export function getRecentDateEntries(dateMap: DateMap, days: number) {
  const today = new Date()
  return Object.entries(dateMap)
    .map(([dateStr, data]) => ({
      dateObj: parse(dateStr, 'yyyy.MM.dd', new Date()),
      dateStr,
      ...data,
    }))
    .filter((entry) => differenceInCalendarDays(today, entry.dateObj) <= days)
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
    .slice(0, days)
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
  const today = new Date()
  return Object.entries(dateMap)
    .map(([dateStr, data]) => ({
      dateObj: parse(dateStr, 'yyyy.MM.dd', new Date()),
      dateStr,
      ...data,
    }))
    .filter((entry) => {
      const diff = differenceInCalendarDays(today, entry.dateObj)
      return diff > startDaysAgo && diff <= endDaysAgo
    })
    .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime())
    .slice(0, endDaysAgo - startDaysAgo)
}
