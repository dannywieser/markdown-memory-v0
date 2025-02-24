import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material'
import { ImageListItem, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import React from 'react'

import type { MarkdownLine, MarkdownText } from '../../markdown/types'

import Header from '../Header/Header'
import { TextSegment } from '../TextSegment/TextSegment'

export interface MarkdownLineProps {
  id: string
  line: MarkdownLine | undefined
}

export interface TextSegmentProps {
  segments: MarkdownText[]
}

const joinTextSegments = (segments: MarkdownText[]) =>
  segments.reduce(
    (text: string, segment: MarkdownText) => `${text}${segment.text}`,
    ''
  )

const img = (textSegments: MarkdownText[]) => {
  const src = joinTextSegments(textSegments)
  return (
    <ImageListItem key={src}>
      <img src={`/images/${src}`} />
    </ImageListItem>
  )
}

const todo = (textSegments: MarkdownText[]) => (
  <Stack alignItems="top" direction="row" gap={1}>
    <CheckBoxOutlineBlank fontSize="small" />
    {textSegments.map((segment, index) => (
      <TextSegment key={`todo-index-${index}`} segment={segment} />
    ))}
  </Stack>
)

const tododone = (textSegments: MarkdownText[]) => (
  <Stack alignItems="top" direction="row" gap={1}>
    <CheckBox fontSize="small" />
    {textSegments.map((segment, index) => (
      <TextSegment key={`tododone-index-${index}`} segment={segment} />
    ))}
  </Stack>
)

const Blockquote = styled('blockquote')(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderLeft: `8px solid ${theme.palette.primary.main}`,
  margin: 0,
  padding: '8px 40px 8px 40px',
}))

const blockquote = (textSegments: MarkdownText[]) => (
  <Blockquote>
    {textSegments.map((segment, index) => (
      <TextSegment key={`blockquote-index-${index}`} segment={segment} />
    ))}
  </Blockquote>
)

const ul = (textSegments: MarkdownText[]) => (
  <li>
    <Typography>{joinTextSegments(textSegments)}</Typography>
  </li>
)

const pre = (textSegments: MarkdownText[]) => (
  <>{`${joinTextSegments(textSegments)}\n`}</>
)

const typeMap = {
  blank: () => <br />,
  blockquote,
  codeend: () => null,
  codestart: () => null,
  h1: (segments: MarkdownText[], id: string) => (
    <Header noteId={id} text={joinTextSegments(segments)} variant="h1" />
  ),
  h2: (segments: MarkdownText[]) => (
    <Header text={joinTextSegments(segments)} variant="h2" />
  ),
  h3: (segments: MarkdownText[]) => (
    <Header text={joinTextSegments(segments)} variant="h3" />
  ),
  h4: (segments: MarkdownText[]) => (
    <Header text={joinTextSegments(segments)} variant="h4" />
  ),
  h5: (segments: MarkdownText[]) => (
    <Header text={joinTextSegments(segments)} variant="h5" />
  ),
  h6: (segments: MarkdownText[]) => (
    <Header text={joinTextSegments(segments)} variant="h6" />
  ),
  img,
  p: (segments: MarkdownText[]) =>
    segments.map((segment, index) => (
      <TextSegment key={`text-segment-${index}`} segment={segment} />
    )),
  pre,
  todo,
  tododone,
  ul,
}

function MarkdownLine({ id, line }: MarkdownLineProps) {
  if (!line) {
    return null
  }
  const { textSegments, type } = line
  const typeHandler = typeMap[type]
  return <div>{typeHandler(textSegments, id)}</div>
}

export default MarkdownLine
