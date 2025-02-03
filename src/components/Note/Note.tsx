import styled from '@emotion/styled'
import { ImageList } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { BearProcessedNote } from 'bear/types'
import React, { useEffect, useState } from 'react'

import { noCacheUrl } from '../../utils/url'
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

  const key = `${id}-${lines.length}`
  return (
    <Section as={sectionType} key={key}>
      {sectionLines}
    </Section>
  )
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

// TODO: how to theme this?
const Pre = styled('pre')(({ theme }) => ({
  backgroundColor: '#1b1b1b',
  borderRadius: `4px`,
  color: 'white',
  fontFamily: theme.typography.fontFamily,
  margin: 0,
  padding: '16px',
  whiteSpace: 'pre-wrap',
}))

const processCodeblock = (lines: MarkdownLine[], id: string) => {
  const sectionLines = []
  while (lines.length > 0) {
    sectionLines.push(<MarkdownLine id={id} line={lines.shift()} />)
    // check if next line exits the current section
    if (!lines[0] || lines[0].type !== 'pre') {
      break
    }
  }
  return <Pre>{sectionLines}</Pre>
}

const notePath = '/notes/'

function Note(props: NoteProps) {
  const { id } = props
  const [body, setBody] = useState<React.JSX.Element[]>([])
  const [note, setNote] = useState<BearProcessedNote>(null)

  const loadNote = async () => {
    const filename = noCacheUrl(`${notePath}${id}.json`)
    const res = await fetch(filename)
    const jsonData = await res.json()
    setNote(jsonData)
  }
  useEffect(() => {
    loadNote()
  }, [])

  useEffect(() => {
    if (note && note.body) {
      const forParsing = [...note.body.lines]
      const body = []
      while (forParsing.length > 0) {
        if (forParsing[0].type === 'ul') {
          body.push(processSection(forParsing, id, 'ul'))
        } else if (forParsing[0].type === 'pre') {
          body.push(processCodeblock(forParsing, id, 'pre'))
        } else if (forParsing[0].type === 'img') {
          body.push(processImageList(forParsing, id))
        } else {
          body.push(<MarkdownLine id={id} line={forParsing.shift()} />)
        }
      }
      setBody(body)
    }
  }, [note])

  return (
    <Card key={id} square={true} sx={{ borderTop: '1px solid #f0f0f0' }}>
      <CardContent>{body}</CardContent>
    </Card>
  )
}

export default Note
