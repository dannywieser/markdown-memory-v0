import { NoteSummaryCard } from '@markdown-memory/components'
import { getAllGroupNames } from '@markdown-memory/profile'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import React from 'react'

import useNotesOnDayByGroup from '../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup'
import { NotesOnDayByGroup } from '../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup.types'
import useStyles from './Dashboard.styles'

// this will handle the possibility that the useNotesOnDayByGroup may return undefined for a given sub-query
const defaultValue: NotesOnDayByGroup = {
  day: '',
  groupName: 'invalid',
  notes: [],
}

export default function Dashboard() {
  const styles = useStyles()
  const day = currentDateNoYear()
  const groups = getAllGroupNames()
  const { data: notesByGroup, pending } = useNotesOnDayByGroup({ day, groups })
  console.log(notesByGroup)

  if (pending) {
    // TODO: loading screen
    return <>loading</>
  }

  return (
    <div className={styles.layout}>
      {notesByGroup.map(({ groupName, notes } = defaultValue) => (
        <NoteSummaryCard
          cardName={`on this day|${groupName}`}
          href={`on-this-day/${groupName}`}
          notes={notes}
        />
      ))}
    </div>
  )
}
