import { Box, Center, Spinner } from '@chakra-ui/react'
import { NoteSummaryCard } from '@markdown-memory/components'
import { getAllGroupNames, loadGroups } from '@markdown-memory/profile'
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
  const groups = loadGroups()
  const groupNames = getAllGroupNames()
  const { data: notesByGroup, pending } = useNotesOnDayByGroup({
    day,
    groups: groupNames,
  })

  if (pending) {
    return (
      <Box bg="bg/80" inset="0" pos="absolute">
        <Center h="full">
          <Spinner animationDuration="1.2s" borderWidth="6px" size="lg" />
        </Center>
      </Box>
    )
  }

  const groupIcon = (groupName: string) =>
    groups.find(({ name }) => name === groupName)?.icon

  return (
    <div className={styles.layout}>
      {notesByGroup.map(({ groupName, notes } = defaultValue) => (
        <NoteSummaryCard
          cardName={`${groupName} | ${day}`}
          href={`on-this-day/${groupName}`}
          icon={groupIcon(groupName)}
          notes={notes}
        />
      ))}
    </div>
  )
}
