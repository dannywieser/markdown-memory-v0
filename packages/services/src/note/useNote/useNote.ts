import { MarkdownNote } from '@markdown-memory/markdown'
import { useQuery } from '@tanstack/react-query'

const fetchNote = async (noteId: string) => {
  const url = `api/notes/${noteId}`
  console.log(`fetchNote ${url}`)
  const res = await fetch(url)
  return (await res.json()) as MarkdownNote
}

export function useNote(noteId: string | undefined) {
  if (!noteId) {
    throw new Error('missing note ID')
  }
  return useQuery({
    queryFn: () => fetchNote(noteId),
    queryKey: ['note', noteId],
  })
}
