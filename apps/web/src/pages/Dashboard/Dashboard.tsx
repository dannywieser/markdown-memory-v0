import { NoteSummaryCard } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import React from 'react'

import useNotesForDay from '../../hooks/useNotesOnDay/useNotesOnDay'
import useStyles from './Dashboard.styles'

export default function Dashboard() {
  const styles = useStyles()
  const day = currentDateNoYear()
  const personalGroup = 'personal'
  const workGroup = 'work'
  // TODO: this would be setup via configuration of cards
  // TODO: this should be able to return multiple groups so we don't need two calls?
  const { data: personalNotes } = useNotesForDay({
    day,
    groupName: personalGroup,
  })
  const { data: workNotes } = useNotesForDay({ day, groupName: workGroup })
  return (
    <div className={styles.layout}>
      <NoteSummaryCard
        cardName={`on this day|${personalGroup}`}
        href={`on-this-day/${personalGroup}`}
        notes={personalNotes}
      />
      <NoteSummaryCard
        cardName={`on this day|${workGroup}`}
        href={`on-this-day/${workGroup}`}
        notes={workNotes}
      />
    </div>
  )
}
