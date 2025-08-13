import { CenteredSpinner, Note } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import { useNotesOnDayByGroup } from '@markdown-memory/services'
import { useParams } from 'react-router'

export default function Today() {
  const { groupName } = useParams()
  const day = currentDateNoYear()
  const groups = groupName ? [groupName] : []
  const { data, pending } = useNotesOnDayByGroup({ day, groups })
  const { notes = [] } = data[0] ?? {}

  if (pending) {
    return <CenteredSpinner />
  }

  return notes.map((note) => (
    <Note key={note.id} note={note} showLink={true} searchTerm={day} />
  ))
}
