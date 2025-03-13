import { Note } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'

import useNotesForDay from '../../hooks/useNotesOnDay/useNotesOnDay'
export default function Today() {
  const day = currentDateNoYear()
  const { data: notes } = useNotesForDay({ day })

  return notes && notes.map((note) => <Note note={note} showLink={true} />)
}
