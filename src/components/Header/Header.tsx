import { Stack, Typography } from '@mui/material'
import { Variant } from '@mui/material/styles/createTypography'
import React from 'react'

import OpenInBear from '../OpenInBear/OpenInBear'

export interface HeaderProps {
  noteId?: string
  text: string
  variant: Variant
}

export default function Header({ noteId, text, variant }: HeaderProps) {
  return (
    <Stack alignItems="center" direction="row" sx={{ marginBottom: '4px' }}>
      <Typography variant={variant}>{text}</Typography>
      <OpenInBear id={noteId} />
    </Stack>
  )
}
