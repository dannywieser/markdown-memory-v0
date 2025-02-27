import { format } from 'date-fns'

export const fmtDate = (date: Date) => format(date, 'yyyy.MM.dd')
export const currentDate = () => fmtDate(new Date())
export const removeYear = (date: string) => date.substring('yyyy.'.length)

const COCOA_CORE_DATE_OFFSET = 978_307_200_000
/**
 * Dates for Bear saved as a Cocoa Core Date. This function converts that date into epoch
 * @param bearDate
 * @returns Date
 */
export const convertDate = (bearDate: string): Date => {
  const epochMs = parseFloat(bearDate) * 1000 + COCOA_CORE_DATE_OFFSET
  return new Date(epochMs)
}
