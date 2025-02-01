import { Box, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { currentDate } from '../../utils'
import Note from '../Note/Note'

const dailyPath = './daily/'
export default function OnThisDay() {
  const date = currentDate()
  const [noteIds, setNoteIds] = useState<string[]>([])

  const loadNotes = async () => {
    const filename = `${dailyPath}${date}.json`
    const res = await fetch(filename)
    const jsonData = await res.json()
    setNoteIds(jsonData)
  }
  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <Container maxWidth={false} sx={{ height: '100%' }}>
      <Box sx={{ height: '100%' }}>
        <Box sx={{ borderBottom: 1 }}>
          <Typography color="primary" variant="h1">
            markdown memory|{date}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(1, 1fr)',
          }}
        >
          {noteIds.map((noteId) => (
            <Note id={noteId} key={noteId} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}
