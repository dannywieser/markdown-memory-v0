import { MarkdownNote } from '@markdown-memory/markdown'
import { useQuery } from '@tanstack/react-query'

import { UseNotesOnDayProps } from './useNotesOnDay.types'

const getNotesForDay = async (date: string) => {
  const url = `api/notes?day=${date}`
  console.log(`getNotesForDay ${url}`)
  const res = await fetch(url)
  return (await res.json()) as MarkdownNote[]
}

export default function useNotesForDay({ day }: UseNotesOnDayProps) {
  return useQuery({
    queryFn: () => getNotesForDay(day),
    queryKey: ['notesForDay', day],
  })
}
