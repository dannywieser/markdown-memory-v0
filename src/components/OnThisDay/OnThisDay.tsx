import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { noCacheUrl } from '../../utils/url'
import Note from '../Note/Note'

const dailyPath = '/daily/'
export default function OnThisDay() {
  const { date } = useParams()
  const [noteIds, setNoteIds] = useState<string[]>([])

  const loadNotes = async () => {
    const filename = noCacheUrl(`${dailyPath}${date}.json`)
    const res = await fetch(filename)
    const jsonData = await res.json()
    setNoteIds(jsonData)
  }
  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <Container maxWidth={false} sx={{ height: '100%', p: 1 }}>
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
          {noteIds.map((noteId) => (
            <Note id={noteId} key={noteId} />
          ))}
        </Box>
      </Box>
    </Container>
  )
}
