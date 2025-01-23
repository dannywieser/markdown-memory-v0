import { CheckBox, CheckBoxOutlineBlank, OpenInNew } from '@mui/icons-material'
import {
  Chip,
  IconButton,
  ImageListItem,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
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

const p = (textSegments: MarkdownText[]) => (
  <Typography>
    {textSegments.map(({ href, text, type }, index) => {
      let tag: React.ElementType = 'span'
      if (type === 'bold') {
        tag = 'b'
      }
      if (type === 'link') {
        return (
          <Link
            href={href}
            key={`segment-${index}`}
            target="_new"
            underline="none"
          >
            {text}
          </Link>
        )
      }
      if (type === 'internallink') {
        return (
          <Stack
            alignItems="center"
            direction="row"
            key={`segment-${index}`}
            sx={{ display: 'inline-flex' }}
          >
            <Typography color="primary" variant="inherit">
              {text}
            </Typography>
            <IconButton
              aria-label="Open Note in Bear"
              color="primary"
              href={`bear://x-callback-url/open-note?title=${encodeURIComponent(
                text
              )}&show_window=yes`}
              size="small"
            >
              <OpenInNew fontSize="inherit" />
            </IconButton>
          </Stack>
        )
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

const ul = (textSegments: MarkdownText[]) => (
  <li>
    <Typography>{joinTextSegments(textSegments)}</Typography>
  </li>
)

const img = (textSegments: MarkdownText[]) => {
  const src = joinTextSegments(textSegments)
  return (
    <ImageListItem key={src}>
      <img src={`./images/${src}`} />
    </ImageListItem>
  )
}

const todo = (textSegments: MarkdownText[]) => (
  <Stack alignItems="top" direction="row" gap={1}>
    <CheckBoxOutlineBlank fontSize="small" />
    <Typography>{joinTextSegments(textSegments).trim()}</Typography>
  </Stack>
)

const tododone = (textSegments: MarkdownText[]) => (
  <Stack alignItems="top" direction="row" gap={1}>
    <CheckBox fontSize="small" />
    {p(textSegments)}
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
  </Blockquote>
)

const Tag = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.grey[500],
  border: 0,
  borderRadius: '8px',
  color: theme.palette.primary.contrastText,
}))

const tag = (textSegments: MarkdownText[]) => (
  <Tag label={joinTextSegments(textSegments)} size="small" variant="outlined" />
)

const pre = (textSegments: MarkdownText[]) => (
  <>{`${joinTextSegments(textSegments)}\n`}</>
)

const typeMap = {
  blank: () => <br />,
  blockquote,
  codeend: () => null,
  codestart: () => null,
  h1: header1,
  h2: header2,
  h3: header3,
  h4: header4,
  h5: header5,
  h6: header6,
  img,
  p,
  pre,
  tag,
  todo,
  tododone,
  ul,
}

function MarkdownLine({ id, line }: MarkdownLineProps) {
  if (!line) {
    return null
  }
  const { textSegments, type } = line
  console.log(`type is ${type}`)
  const typeHandler = typeMap[type]
  return typeHandler(textSegments, id)
}

export default MarkdownLine
