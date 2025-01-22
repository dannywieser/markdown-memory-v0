import { ImageList, ImageListItem } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import React, { useEffect, useState } from 'react'

import MarkdownLine from '../MarkdownLine/MarkdownLine'
import { NoteProps } from './Note.types'

type SectionProps = {
  as?: React.ElementType
  children: React.ReactNode
}

export const Section = (props: SectionProps) => {
  const { as: Tag = 'div', children } = props
  return <Tag>{children}</Tag>
}

const processSection = (
  lines: MarkdownLine[],
  id: string,
  sectionType: React.ElementType
) => {
  const sectionLines = []
  while (lines.length > 0) {
    sectionLines.push(<MarkdownLine id={id} line={lines.shift()} />)
    // check if next line exits the current section
    if (!lines[0] || lines[0].type !== sectionType) {
      break
    }
  }
  return <Section as={sectionType}>{sectionLines}</Section>
}

const processImageList = (lines: MarkdownLine[], id: string) => {
  const sectionLines = []
  let imageCount = 0
  while (lines.length > 0) {
    sectionLines.push(<MarkdownLine id={id} line={lines.shift()} />)
    imageCount += 1
    // check if next line exits the current section
    if (!lines[0] || lines[0].type !== 'img') {
      break
    }
  }
  return (
    <ImageList cols={imageCount} sx={{ width: '50%' }}>
      {sectionLines}
    </ImageList>
  )
}

function Note(props: NoteProps) {
  const {
    body: { lines },
    id,
  } = props

  const [body, setBody] = useState<React.JSX.Element[]>([])

  useEffect(() => {
    const forParsing = [...lines]
    const body = []
    while (forParsing.length > 0) {
      if (forParsing[0].type === 'ul') {
        body.push(processSection(forParsing, id, 'ul'))
      } else if (forParsing[0].type === 'img') {
        body.push(processImageList(forParsing, id))
      } else {
        body.push(<MarkdownLine id={id} line={forParsing.shift()} />)
      }
    }
    setBody(body)
  }, [lines])

  return (
    <Card square={true} sx={{ borderTop: '1px solid #f0f0f0' }}>
      <CardContent>{body}</CardContent>
    </Card>
  )
}

export default Note
