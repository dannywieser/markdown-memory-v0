import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React from 'react'

import MarkdownLine from '../MarkdownLine/MarkdownLine'
import { NoteProps } from './Note.types'

function Note(props: NoteProps) {
  const {
    body: { lines },
  } = props
  return (
    <Card variant="outlined">
      <CardContent>
        {lines.map((line, index) => (
          <MarkdownLine key={index} line={line} />
        ))}
      </CardContent>
    </Card>
  )
}

export default Note
