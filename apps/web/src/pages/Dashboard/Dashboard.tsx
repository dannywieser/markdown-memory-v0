import { SimpleGrid } from '@chakra-ui/react'
import {
  CenteredSpinner,
  EntriesOnThisDayCard,
  RecentEntriesCard,
  FrequencyMap,
  NoteSummaryCard,
} from '@markdown-memory/components'
import { getAllGroupNames, loadGroups } from '@markdown-memory/profile'
import { useStats } from '@markdown-memory/services'
import { currentDateNoYear } from '@markdown-memory/utilities/date'

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

  if (isPending || notesPending || !stats) {
    return <CenteredSpinner />
  }

  const margins = { lg: '10%', md: '6%', sm: '50px' }
  return (
    <SimpleGrid gap="2" ml={margins} mr={margins} p="2">
      <FrequencyMap stats={stats} />
      <RecentEntriesCard stats={stats} days={7} type="created" />
      <EntriesOnThisDayCard />
      {notesByGroup.map((groupNotes) =>
        groupNotes ? (
          <NoteSummaryCard
            cardName={`${groupNotes.groupName} | ${day}`}
            href={`on-this-day/${groupNotes.groupName}`}
            icon={groupIcon(groupNotes.groupName)}
            notes={groupNotes.notes}
          />
        ) : null
      )}
    </SimpleGrid>
  )
}
