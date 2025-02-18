import { useQuery } from '@tanstack/react-query'

import { noCacheUrl } from '../../utils/url'
const dailyPath = '/daily/'

const getDailyNotes = async (group: string, date: string) => {
  const filename = noCacheUrl(`${dailyPath}${group}-${date}.json`)
  console.log(`loadNotes ${filename}`)
  const res = await fetch(filename)
  return await res.json()
}

export interface UseDailyNotesProps {
  date: string
  group: string
}

export default function useDailyNotes({ date, group }: UseDailyNotesProps) {
  return useQuery({
    queryFn: () => getDailyNotes(group, date),
    queryKey: [`${group}-${date}-dailyNotes`],
  })
}
