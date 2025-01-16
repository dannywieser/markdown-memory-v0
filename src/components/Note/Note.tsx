import Paper from '@mui/material/Paper'
import React from 'react'

import MarkdownLine from '../MarkdownLine/MarkdownLine'
import { NoteProps } from './Note.types'

function Note(props: NoteProps) {
  const {
    body: { lines },
  } = props
  return (
    <Paper elevation={0} square={true} sx={{ borderTop: '1px solid #f0f0f0' }}>
      {lines.map((line, index) => (
        <MarkdownLine key={index} line={line} />
      ))}
    </Paper>
  )
}

export default Note
