import { Typography } from '@mui/material'
import React from 'react'

import type { MarkdownLine, MarkdownText } from '../../markdown/types'

export interface MarkdownLineProps {
  line: MarkdownLine
}

export interface TextSegmentProps {
  segments: MarkdownText[]
}

// function TextSegments({ segments }: TextSegmentProps) {
//   return segments.map(({ text }, index) => (
//     <p key={`segment-${index}`}>{text}</p>
//   ))
// }

const joinTextSegments = (segments: MarkdownText[]) =>
  segments.reduce(
    (text: string, segment: MarkdownText) => `${text}${segment.text}`,
    ''
  )

function MarkdownLine({ line }: MarkdownLineProps) {
  const { textSegments, type } = line
  if (type === 'h1') {
    return (
      <Typography component="h1" variant="h6">
        {joinTextSegments(textSegments)}
      </Typography>
    )
  }

  return <></>
}

export default MarkdownLine
