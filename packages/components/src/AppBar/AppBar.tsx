import { Box, Typography } from '@mui/material'
import React from 'react'

import { currentDate } from '../../utils'

export default function AppBar() {
  const date = currentDate()
  return (
    <Box sx={{ backgroundColor: 'black', p: 1 }}>
      <Typography color="secondary.contrastText" variant="h1">
        markdown memory|{date}
      </Typography>
    </Box>
  )
}
