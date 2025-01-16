import { Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import React from 'react'

import type { MarkdownLine, MarkdownText } from '../../markdown/types'

export interface MarkdownLineProps {
  line: MarkdownLine
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

const header1 = (textSegments: MarkdownText[]) => (
  <Typography variant="h1">{joinTextSegments(textSegments)}</Typography>
)

const header2 = (textSegments: MarkdownText[]) => (
  <Typography variant="h2">{joinTextSegments(textSegments)}</Typography>
)

const header3 = (textSegments: MarkdownText[]) => (
  <Typography variant="h3">{joinTextSegments(textSegments)}</Typography>
)

const header4 = (textSegments: MarkdownText[]) => (
  <Typography variant="h4">{joinTextSegments(textSegments)}</Typography>
)

const header5 = (textSegments: MarkdownText[]) => (
  <Typography variant="h5">{joinTextSegments(textSegments)}</Typography>
)

const header6 = (textSegments: MarkdownText[]) => (
  <Typography variant="h6">{joinTextSegments(textSegments)}</Typography>
)

const typeMap = {
  blank: () => <br />,
  blockquote: () => 'blockquote',
  codebody: () => 'codebody',
  codeend: () => 'codeend',
  codestart: () => 'codestart',
  h1: header1,
  h2: header2,
  h3: header3,
  h4: header4,
  h5: header5,
  h6: header6,
  p: normalText,
  unorderedlist: () => 'unorderedlist',
}

function MarkdownLine({ line }: MarkdownLineProps) {
  const { textSegments, type } = line
  const typeHandler = typeMap[type]
  return typeHandler(textSegments)
}

export default MarkdownLine
