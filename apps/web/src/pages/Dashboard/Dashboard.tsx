import { Grid, GridItem } from '@chakra-ui/react'
import {
  CenteredSpinner,
  EntriesOnThisDayCard,
  RecentEntriesCard,
  FrequencyMap,
  NoteSummaryCard,
  RandomNoteCard,
  Error,
} from '@markdown-memory/components'
import { getAllGroupNames, loadGroups } from '@markdown-memory/profile'
import { useStats, useNotesOnDayByGroup } from '@markdown-memory/services'
import { currentDateNoYear } from '@markdown-memory/utilities/date'

export default function Dashboard() {
  const {
    data: stats,
    isPending: statsPending,
    isError: statsError,
  } = useStats()

  const day = currentDateNoYear()
  const groups = loadGroups()
  const groupNames = getAllGroupNames()
  const {
    data: notesByGroup,
    pending: notesPending,
    error: notesError,
  } = useNotesOnDayByGroup({
    day,
    groups: groupNames,
  })
  const groupIcon = (groupName: string) =>
    groups.find(({ name }) => name === groupName)?.icon

  const error = statsError || notesError

  if (error) {
    return <Error errorTitle="Did you expect an error? Well, neither did I!" />
  }

  const loading = statsPending || notesPending || !stats
  if (loading) {
    return <CenteredSpinner />
  }

  return (
    <Grid
      templateColumns={{
        base: 'repeat(6, 1fr)',
      }}
      gap={4}
      p="2"
      alignItems="stretch"
      mx={{ base: 1, md: 6, lg: 12 }}
    >
      <GridItem colSpan={{ base: 6, md: 5 }} h="full" rowSpan={2}>
        <FrequencyMap stats={stats} />
      </GridItem>
      <GridItem h="full" colSpan={{ base: 6, md: 1 }}>
        <RecentEntriesCard stats={stats} days={7} type="created" />
      </GridItem>
      <GridItem h="full" colSpan={{ base: 6, md: 1 }}>
        <RecentEntriesCard stats={stats} days={7} type="modified" />
      </GridItem>
      <GridItem colSpan={{ base: 6 }} h="full">
        <EntriesOnThisDayCard />
      </GridItem>
      {notesByGroup.map((groupNotes, idx) =>
        groupNotes && groupNotes.notes.length > 0 ? (
          <GridItem key={idx} colSpan={{ base: 6, md: 2 }} h="full">
            <NoteSummaryCard
              cardName={`${groupNotes.groupName} | ${day}`}
              href={`on-this-day/${groupNotes.groupName}`}
              icon={groupIcon(groupNotes.groupName)}
              notes={groupNotes.notes}
            />
          </GridItem>
        ) : null
      )}
      <GridItem colSpan={{ base: 6 }} h="full">
        <RandomNoteCard />
      </GridItem>
    </Grid>
  )
}
