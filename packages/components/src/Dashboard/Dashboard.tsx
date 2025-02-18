import { Box, Container, styled } from '@mui/material'
import React from 'react'

import { currentDate } from '../../utils'
import AppBar from '../AppBar/AppBar'
import DayCard from '../DayCard/DayCard'

// TODO: config
const groups = ['personal', 'work']

export const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2),

  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))

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
        <Grid>
          {groups.map((group: string) => (
            <DayCard date={date} group={group} key={group} />
          ))}
        </Grid>
      </Box>
    </Container>
  )
}
