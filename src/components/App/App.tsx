import { Box, Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { BearProcessedNote } from '../../bear/types'
import { currentDate } from '../../utils'
import Note from '../Note/Note'

const dataPath = './daily-extracts/'

function App() {
  const date = currentDate()
  const [data, setData] = useState<BearProcessedNote[]>([])

  const getData = async () => {
    const filename = `${dataPath}${date}.json`
    const res = await fetch(filename)
    const jsonData = await res.json()
    setData(jsonData)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <Container maxWidth={false} sx={{ height: '100%' }}>
      <Box sx={{ height: '100%' }}>
        <Typography color="primary" variant="h1">
          Bear|Insights
        </Typography>
        <Typography variant="h2">{date}</Typography>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          {data.map((data) => (
            <Note body={data.body} key={data.id} />
          ))}
        </Box>{' '}
      </Box>
    </Container>
  )
}

export default App
