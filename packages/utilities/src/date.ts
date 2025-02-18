import { format } from 'date-fns'

export const fmtDate = (date: Date) => format(date, 'yyyy.MM.dd')
export const currentDate = () => fmtDate(new Date())
export const removeYear = (date: string) => date.substring('yyyy.'.length)
