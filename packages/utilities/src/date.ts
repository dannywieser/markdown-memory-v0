import { format } from 'date-fns'

// TODO: configurable date format based on user preference

export const fmtDate = (date: Date) => {
  try {
    return format(date, 'yyyy.MM.dd')
  } catch (_e) {
    console.error(date)
  }
  return null
}
export const fmtDateNoYear = (date: Date) => format(date, 'MM.dd')
export const currentDate = () => fmtDate(new Date())
export const currentDateNoYear = () => fmtDateNoYear(new Date())
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

function isValidDate(date: Date) {
  return date instanceof Date && !isNaN(date as unknown as number)
}

// TODO: this function needs a lot of work
export const findDatesInText = (text: string): Date[] => {
  const regex = /\d{4}.\d{2}.\d{2}/g
  const matchedDateStrings = text.match(regex)

  if (!matchedDateStrings) {
    return []
  }

  const dates = []
  for (const matchedDate of matchedDateStrings) {
    const date = new Date(matchedDate)
    if (isValidDate(date)) {
      dates.push(date)
    }
  }
  return dates
}
