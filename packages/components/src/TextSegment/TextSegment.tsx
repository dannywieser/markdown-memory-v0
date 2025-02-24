import { OpenInNew } from '@mui/icons-material'
import { IconButton, Link, Stack, styled, Typography } from '@mui/material'
import React, { ElementType } from 'react'

import { MarkdownText } from '../../markdown/types'
import { Tag } from '../Tag/Tag'

export interface TextSegmentProps {
  segment: MarkdownText
}

type SectionProps = {
  as?: React.ElementType
  children: React.ReactNode
}

export const Span = (props: SectionProps) => {
  const { as: Tag = 'div', children } = props
  return <Tag>{children}</Tag>
}

// eslint-disable-next-line react/display-name
const segment = (tag: ElementType) => (text: string) =>
  (
    <Span as={tag}>
      <Typography display="inline">{text}</Typography>
    </Span>
  )

const link = (text: string, href: string | undefined) => (
  <Link href={href} target="_new" underline="none">
    <Typography>{text}</Typography>
  </Link>
)

const internallink = (text: string) => (
  <Stack alignItems="center" direction="row" sx={{ display: 'inline-flex' }}>
    <Typography color="primary">{text}</Typography>
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

const Code = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
}))

const typeMap = {
  bold: (text: string) => (
    <Typography display="inline" sx={{ fontWeight: 'bolder' }}>
      {text}
    </Typography>
  ),
  code: (text: string) => <Code display="inline">{text}</Code>,
  internallink,
  italic: (text: string) => segment('em')(text),
  link,
  src: () => 'src',
  string: (text: string) => segment('span')(text),
  tag: (text: string) => <Tag label={text} size="small" variant="outlined" />,
}

export const TextSegment = ({
  segment: { href, text, type },
}: TextSegmentProps) => {
  const segmentHandler = typeMap[type]
  return segmentHandler(text, href)
}
