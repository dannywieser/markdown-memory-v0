import { NoteSummaryCard } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import React from 'react'

import useNotesForDay from '../../hooks/useNotesOnDay/useNotesOnDay'

export default function Dashboard() {
  const day = currentDateNoYear()
  const groupName = 'personal'
  // TODO: this would be setup via configuration of cards
  const { data: personalNotes } = useNotesForDay({ day, groupName })
  return (
    <div>
      <NoteSummaryCard
        notes={personalNotes}
        cardName={`on this day|${groupName}`}
        href={`on-this-day/${groupName}`}
      />
    </div>
  )
}
