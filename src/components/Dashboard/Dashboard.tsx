import {
  Box,
  Card,
  CardContent,
  Container,
  Link,
  Typography,
} from '@mui/material'
import React from 'react'

import { currentDate } from '../../utils'

export default function Dashboard() {
  const date = currentDate()
  return (
    <Container maxWidth={false} sx={{ height: '100%' }}>
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          <Card square={true} sx={{ borderTop: '1px solid #f0f0f0' }}>
            <CardContent>
              <Typography color="primary" variant="h1">
                markdown memory|{date}
              </Typography>
            </CardContent>
          </Card>
          <Card square={true} sx={{ borderTop: '1px solid #f0f0f0' }}>
            <CardContent>
              <Link color="primary" href={`/on-this-day/personal/${date}`}>
                <Typography>On This Day</Typography>
              </Link>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  )
}
