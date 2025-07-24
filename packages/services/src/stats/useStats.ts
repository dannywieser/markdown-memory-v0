import { currentDate } from '@markdown-memory/utilities/date'
import { useQuery } from '@tanstack/react-query'

import { Stats } from './stats.types'

const fetchStats = async () => {
  const url = `api/stats/`
  console.log(`fetchStats ${url}`)
  const res = await fetch(url)
  return (await res.json()) as Stats
}

export default function useStats() {
  return useQuery({
    queryFn: () => fetchStats(),
    queryKey: ['stats', currentDate()],
  })
}
