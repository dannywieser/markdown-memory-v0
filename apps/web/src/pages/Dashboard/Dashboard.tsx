import { SimpleGrid, Stat } from '@chakra-ui/react'
import {
  CenteredSpinner,
  EntriesOnThisDay,
  FrequencyMap,
  NoteSummaryCard,
} from '@markdown-memory/components'
import { getAllGroupNames, loadGroups } from '@markdown-memory/profile'
import { useStats } from '@markdown-memory/services'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import React from 'react'

import useNotesOnDayByGroup from '../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup'

// TODO:
//   - random note
//   - AI summary of on this day
//.  - total tags
//. - pinned notes

// next: need to move hooks/service types into package

export default function Dashboard() {
  const { data: stats, isPending } = useStats()

  const day = currentDateNoYear()
  const groups = loadGroups()
  const groupNames = getAllGroupNames()
  const { data: notesByGroup, pending: notesPending } = useNotesOnDayByGroup({
    day,
    groups: groupNames,
  })
  const groupIcon = (groupName: string) =>
    groups.find(({ name }) => name === groupName)?.icon

  if (isPending || notesPending || !stats || !notesByGroup) {
    return <CenteredSpinner />
  }

  return (
    <SimpleGrid gap="2" minChildWidth="sm" p="2">
      <Stat.Root borderWidth="1px" p="2" rounded="sm">
        <Stat.Label>Entries | All</Stat.Label>
        <Stat.ValueText>{stats.totalEntries}</Stat.ValueText>
        <FrequencyMap dateMap={stats.dateMap} />
      </Stat.Root>

      {/* <EntriesThisWeek />*/}
      <EntriesOnThisDay />
      {notesByGroup.map(({ groupName, notes } = defaultValue) => (
        <NoteSummaryCard
          cardName={`${groupName} | ${day}`}
          href={`on-this-day/${groupName}`}
          icon={groupIcon(groupName)}
          notes={notes}
        />
      ))}
    </SimpleGrid>
  )
}
