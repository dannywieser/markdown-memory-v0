import { format } from 'date-fns'

export const fmtDate = (date: Date) => format(date, 'yyyy.MM.dd')
export const currentDate = () => fmtDate(new Date())
export const removeYear = (date: string) => date.substring('yyyy.'.length)

// times are from 2001 vs 1970
const EPOCH_OFFSET = 978_265_512_000
/**
 * Dates for Bear are an epoch time starting from 2001 vs 1970. This function will convert these dates in Date objects
 * @param bearDate
 * @returns Date
 */
export const convertDate = (bearDate: string) => {
  const epochMs = parseFloat(bearDate) * 1000 + EPOCH_OFFSET
  return new Date(epochMs)
}
