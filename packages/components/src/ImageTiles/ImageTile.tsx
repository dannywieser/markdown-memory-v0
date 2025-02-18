import { Box } from '@mui/material'
import React, { useRef } from 'react'
import Draggable from 'react-draggable'

export interface ImageTileProps {
  backgroundColor: string
  height: number
  width: number
}

export default function ImageTile({
  backgroundColor,
  height,
  width,
}: ImageTileProps) {
  const nodeRef = useRef(null)
  return (
    <Draggable bounds="parent" nodeRef={nodeRef}>
      <Box
        className="handle"
        ref={nodeRef}
        sx={{
          backgroundColor,
          border: '8px solid white',
          height,
          width,
        }}
      ></Box>
    </Draggable>
  )
}
