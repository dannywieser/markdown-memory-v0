import { useQueries } from '@tanstack/react-query'

import {
  NotesOnDayByGroup,
  UseNotesOnDayByGroupProps,
} from './useNotesOnDayByGroup.types'

const fetchNotesByDayAndGroup = async (
  day: string,
  groupName: string
): Promise<NotesOnDayByGroup> => {
  const url = `api/notes/groups/${groupName}?day=${day}`
  console.log(`getNotesForDay ${url}`)
  const res = await fetch(url)
  const notes = await res.json()
  return { day, groupName, notes }
}

export default function useNotesOnDayByGroup({
  day,
  groups,
}: UseNotesOnDayByGroupProps) {
  return useQueries({
    combine: (results) => ({
      data: results.map(({ data }) => data),
      pending: results.some(({ isPending }) => isPending),
    }),
    queries: groups.map((group) => ({
      queryFn: () => fetchNotesByDayAndGroup(day, group),
      queryKey: ['notesOnDayByGroup', day, group],
    })),
  })
}
