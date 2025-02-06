import {
  Box,
  Card,
  CardContent,
  Container,
  Link,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'

import { currentDate } from '../../utils'
import AppBar from '../AppBar/AppBar'

// TODO: config
const groups = ['work', 'personal']

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
            <Card
              key={group}
              square={true}
              sx={{ borderTop: '1px solid #f0f0f0' }}
            >
              <CardContent>
                <Link color="primary" href={`/on-this-day/${group}/${date}`}>
                  <Typography>On This Day: {group}</Typography>
                </Link>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
