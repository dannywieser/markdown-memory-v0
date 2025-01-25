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

import Header from '../Header/Header'

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
      if (type === 'tag') {
        return (
          <Tag
            key={`segment-${index}`}
            label={text}
            size="small"
            variant="outlined"
          />
        )
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
  p,
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
  console.log(`type is ${type}`)
  const typeHandler = typeMap[type]
  return typeHandler(textSegments, id)
}

export default MarkdownLine
