import { MarkdownNote } from '@markdown-memory/markdown'
import { useQuery } from '@tanstack/react-query'

import { UseNotesOnDayProps } from './useNotesOnDay.types'

const getNotesForDay = async (date: string, groupName?: string) => {
  const url = groupName
    ? `api/notes/groups/${groupName}?day=${date}`
    : `api/notes?day=${date}`
  console.log(`getNotesForDay ${url}`)
  const res = await fetch(url)
  return (await res.json()) as MarkdownNote[]
}

export default function useNotesForDay({ day, groupName }: UseNotesOnDayProps) {
  return useQuery({
    queryFn: () => getNotesForDay(day, groupName),
    queryKey: ['notesForDay', day, groupName],
  })
}
