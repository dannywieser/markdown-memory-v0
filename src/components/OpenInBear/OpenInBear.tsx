import { OpenInNew } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React from 'react'

export interface OpenInBearProps {
  id?: string
}

const createOpenNoteUrl = ({ id }: OpenInBearProps) => {
  return `bear://x-callback-url/open-note?id=${id}&show_window=yes`
}

export default function OpenInBear(props: OpenInBearProps) {
  const url = createOpenNoteUrl(props)
  return (
    <IconButton
      aria-label="Open Note in Bear"
      color="primary"
      href={url}
      size="small"
    >
      <OpenInNew fontSize="inherit" />
    </IconButton>
  )
}
