import { useQuery } from '@tanstack/react-query'

import { Day, DayProps } from './day.types'

const fetchDay = async (day: string) => {
  const url = `api/day/${day}`
  console.log(`fetchStats ${url}`)
  const res = await fetch(url)
  return (await res.json()) as Day
}

export function useDay({ day }: DayProps) {
  return useQuery({
    queryFn: () => fetchDay(day),
    queryKey: ['day', day],
  })
}
