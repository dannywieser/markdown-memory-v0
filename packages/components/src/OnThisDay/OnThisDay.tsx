import { Box, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { noCacheUrl } from '../../utils/url'
import AppBar from '../AppBar/AppBar'
import Note from '../Note/Note'

const dailyPath = '/daily/'
export default function OnThisDay() {
  const { date, group } = useParams()
  const [noteIds, setNoteIds] = useState<string[]>([])

  const loadNotes = async () => {
    const filename = noCacheUrl(`${dailyPath}${group}-${date}.json`)
    console.log(`loadNotes ${filename}`)
    const res = await fetch(filename)
    const jsonData = await res.json()
    setNoteIds(jsonData.notes)
  }
  useEffect(() => {
    loadNotes()
  }, [])

  return (
    <Container
      disableGutters={true}
      maxWidth={false}
      sx={{ height: '100%', p: 0 }}
    >
      <AppBar />
      <Box sx={{ height: '100%' }}>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(1, 1fr)',
            p: 1,
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
