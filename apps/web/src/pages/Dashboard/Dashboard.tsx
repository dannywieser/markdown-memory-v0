import { SimpleGrid, Stat } from '@chakra-ui/react'
import {
  CenteredSpinner,
  EntriesOnThisDay,
  FrequencyMap,
} from '@markdown-memory/components'
import { useStats } from '@markdown-memory/services'
import React from 'react'

// TODO:
//   - random note
//   - AI summary of on this day
//.  - total tags
//. - pinned notes

// next: need to move hooks/service types into package

export default function Dashboard() {
  const { data: stats, isPending } = useStats()

  if (isPending || !stats) {
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
    </SimpleGrid>
  )
}
