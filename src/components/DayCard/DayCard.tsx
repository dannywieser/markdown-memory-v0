import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

import useDailyNotes from '../../hooks/useDailyNotes/useDailyNotes'
import { Tag } from '../Tag/Tag'

export interface DayCardProps {
  date: string
  group: string
}

export const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(0.5),

  padding: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}))

export default function DayCard({ date, group }: DayCardProps) {
  const targetUrl = `/on-this-day/${group}/${date}`
  const [noteCount, setNoteCount] = useState<number>(0)
  const [tagCounts, setTagCounts] = useState<[string, number][]>()

  const { data, isPending } = useDailyNotes({ date, group })

  useEffect(() => {
    if (data) {
      setNoteCount(data.notes.length)
      setTagCounts(Object.entries(data.tagCounts))
    }
  }, [data])

  if (tagCounts) {
    tagCounts.map((value) => console.log(value))
  }

  return isPending ? null : (
    <Card key={group} square={true}>
      <CardActionArea component={Link} sx={{ height: '100%' }} to={targetUrl}>
        <CardContent>
          <Typography variant="h2">{group}</Typography>
          <Typography>{noteCount} notes</Typography>
          <Grid>
            {tagCounts &&
              tagCounts.map((value: [string, number]) => (
                <Tag
                  key={`tag-${value[0]}`}
                  label={`#${value[0]}: ${value[1]}`}
                  size="small"
                  variant="outlined"
                />
              ))}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
