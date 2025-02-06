import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { noCacheUrl } from '../../utils/url'
import { Tag } from '../Tag/Tag'

export interface DayCardProps {
  date: string
  group: string
}

export default function DayCard({ date, group }: DayCardProps) {
  const targetUrl = `/on-this-day/${group}/${date}`

  const [noteCount, setNoteCount] = useState<number>(0)
  const [tagCounts, setTagCounts] = useState<[string, number][]>()

  // TODO: resuable hook, react-query
  const dailyPath = '/daily/'
  const loadNotes = async () => {
    const filename = noCacheUrl(`${dailyPath}${group}-${date}.json`)
    console.log(`loadNotes ${filename}`)
    const res = await fetch(filename)
    const jsonData = await res.json()
    setNoteCount(jsonData.notes.length)
    setTagCounts(Object.entries(jsonData.tagCounts))
  }
  useEffect(() => {
    loadNotes()
  }, [])

  if (tagCounts) {
    tagCounts.map((value) => console.log(value))
  }

  return (
    <Card key={group} square={true}>
      <CardActionArea component={Link} to={targetUrl}>
        <CardContent>
          <Typography variant="h2">{group}</Typography>
          <Typography>{noteCount} notes</Typography>
          <Box
            sx={{
              display: 'grid',
              gap: 1,
              gridTemplateColumns: 'repeat(4, 1fr)',
              p: 1,
            }}
          >
            {tagCounts &&
              tagCounts.map((value: [string, number]) => (
                <Tag
                  key={`tag-${value[0]}`}
                  label={`${value[0]}: ${value[1]}`}
                  size="small"
                  variant="outlined"
                />
              ))}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
