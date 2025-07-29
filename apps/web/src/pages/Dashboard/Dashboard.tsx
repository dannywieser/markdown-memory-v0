import { SimpleGrid } from '@chakra-ui/react'
import { CenteredSpinner, FrequencyMap } from '@markdown-memory/components'
import { useStats } from '@markdown-memory/services'
import React from 'react'

import { TotalEntries } from './statCards'

// TODO:
//   - heat graph showing entries over time
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
      <FrequencyMap dateMap={stats.dateMap} />
      <TotalEntries stats={stats} />
      {/* <EntriesThisWeek />
      <EntriesOnThisDay /> */}
    </SimpleGrid>
  )
}
