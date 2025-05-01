import { Note } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import { useParams } from 'react-router'

import useNotesOnDayByGroup from '../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup'
export default function Today() {
  const { groupName } = useParams()
  const day = currentDateNoYear()
  const groups = groupName ? [groupName] : []
  const { data, pending } = useNotesOnDayByGroup({ day, groups })
  const { notes = [] } = data[0] ?? {}

  if (pending) {
    // TODO: loading screen
    return <>loading</>
  }

  return notes.map((note) => <Note key={note.id} note={note} showLink={true} />)
}
