import { Box, Container } from '@mui/material'
import React from 'react'

import { currentDate } from '../../utils'
import AppBar from '../AppBar/AppBar'
import DayCard from '../DayCard/DayCard'

// TODO: config
const groups = ['personal', 'work']

export default function Dashboard() {
  const date = currentDate()
  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ height: '100%', m: 0, p: 0 }}
    >
      <Box sx={{ height: '100%' }}>
        <AppBar />
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(2, 1fr)',
            p: 1,
          }}
        >
          {groups.map((group: string) => (
            <DayCard date={date} group={group} key={group} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}
