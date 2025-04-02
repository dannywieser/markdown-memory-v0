import { NoteSummaryCard } from '@markdown-memory/components'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import React from 'react'

import useNotesForDay from '../../hooks/useNotesOnDay/useNotesOnDay'

export default function Dashboard() {
  const day = currentDateNoYear()
  // TODO: this would be setup via configuration of cards
  const { data: notes } = useNotesForDay({ day, groupName: 'personal' })
  return (
    <div>
      <NoteSummaryCard notes={notes} cardName="personal" />
    </div>
  )
}
