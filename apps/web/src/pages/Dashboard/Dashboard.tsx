import { Badge, HStack, SimpleGrid, Stat } from '@chakra-ui/react'
import React from 'react'

const TotalEntries = () => (
  <Stat.Root borderWidth="1px" p="2" rounded="sm">
    <Stat.Label>Entries | All</Stat.Label>
    <Stat.ValueText>3500</Stat.ValueText>
  </Stat.Root>
)

const EntriesThisWeek = () => (
  <Stat.Root borderWidth="1px" p="2" rounded="sm">
    <Stat.Label>Entries | Last 7 days</Stat.Label>
    <HStack>
      <Stat.ValueText>10</Stat.ValueText>
      <Badge colorPalette="green" gap="0">
        <Stat.UpIndicator />
        12%
      </Badge>
    </HStack>
  </Stat.Root>
)

const EntriesOnThisDay = () => (
  <Stat.Root borderWidth="1px" p="2" rounded="sm">
    <Stat.Label>On This Day | 07.22</Stat.Label>
    <Stat.ValueText>6</Stat.ValueText>
  </Stat.Root>
)

// TODO:
//   - heat graph showing entries over time
//   - random note
//   - AI summary of on this day
//. - pinned notes

export default function Dashboard() {
  return (
    <SimpleGrid gap="2" minChildWidth="sm" p="2">
      <TotalEntries />
      <EntriesThisWeek />
      <EntriesOnThisDay />
    </SimpleGrid>
  )
}
