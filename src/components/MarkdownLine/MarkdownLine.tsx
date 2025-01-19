import { CheckCircleOutline, OpenInNew } from '@mui/icons-material'
import { Chip, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'

import type { MarkdownLine, MarkdownText } from '../../markdown/types'

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

type SectionProps = {
  as?: React.ElementType
  children: React.ReactNode
}

export const Span = (props: SectionProps) => {
  const { as: Tag = 'div', children } = props
  return <Tag>{children}</Tag>
}

const normalText = (textSegments: MarkdownText[]) => (
  <Typography>
    {textSegments.map(({ text, type }, index) => {
      let tag: React.ElementType = 'span'
      if (type === 'bold') {
        tag = 'b'
      }
      return (
        <Span as={tag} key={`segment-${index}`}>
          {text}
        </Span>
      )
    })}
  </Typography>
)

const header1 = (textSegments: MarkdownText[], id: string) => (
  <Stack alignItems="center" direction="row" sx={{ marginBottom: '4px' }}>
    <Typography variant="h1">{joinTextSegments(textSegments)}</Typography>
    <IconButton
      aria-label="Open Note in Bear"
      color="primary"
      href={`bear://x-callback-url/open-note?id=${id}`}
      size="small"
    >
      <OpenInNew fontSize="inherit" />
    </IconButton>
  </Stack>
)

const header2 = (textSegments: MarkdownText[]) => (
  <Typography gutterBottom sx={{ marginTop: '7px' }} variant="h2">
    {joinTextSegments(textSegments)}
  </Typography>
)

const header3 = (textSegments: MarkdownText[]) => (
  <Typography gutterBottom sx={{ marginTop: '7px' }} variant="h3">
    {joinTextSegments(textSegments)}
  </Typography>
)

const header4 = (textSegments: MarkdownText[]) => (
  <Typography gutterBottom variant="h4">
    {joinTextSegments(textSegments)}
  </Typography>
)

const header5 = (textSegments: MarkdownText[]) => (
  <Typography gutterBottom variant="h5">
    {joinTextSegments(textSegments)}
  </Typography>
)

const header6 = (textSegments: MarkdownText[]) => (
  <Typography gutterBottom variant="h6">
    {joinTextSegments(textSegments)}
  </Typography>
)

const listitem = (textSegments: MarkdownText[]) => (
  <li>
    <Typography>{joinTextSegments(textSegments)}</Typography>
  </li>
)

const tag = (textSegments: MarkdownText[]) => (
  <Chip
    color="primary"
    label={joinTextSegments(textSegments)}
    size="small"
    variant="outlined"
  />
)

const done = (textSegments: MarkdownText[]) => (
  <Stack alignItems="center" direction="row" gap={1}>
    <CheckCircleOutline sx={{ fontSize: 14 }} />
    <Typography>{joinTextSegments(textSegments).trim()}</Typography>
  </Stack>
)

const typeMap = {
  blank: () => <br />,
  blockquote: () => ' blockquote',
  codebody: () => ' codebody',
  codeend: () => ' codeend',
  codestart: () => ' codestart',
  h1: header1,
  h2: header2,
  h3: header3,
  h4: header4,
  h5: header5,
  h6: header6,
  p: normalText,
  tag: tag,
  todo: () => 'todo',
  tododone: done,
  ul: listitem,
}

function MarkdownLine({ id, line }: MarkdownLineProps) {
  if (!line) {
    return null
  }
  const { textSegments, type } = line
  const typeHandler = typeMap[type]
  return typeHandler(textSegments, id)
}

export default MarkdownLine
