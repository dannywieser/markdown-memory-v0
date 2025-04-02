import { Note } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import { useParams } from 'react-router'

import useNotesForDay from '../../hooks/useNotesOnDay/useNotesOnDay'
export default function Today() {
  const { groupName } = useParams()
  const day = currentDateNoYear()
  const { data: notes } = useNotesForDay({ day, groupName })
  return (
    notes &&
    notes.map((note) => <Note note={note} showLink={true} key={note.id} />)
  )
}
