import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Draggable from 'react-draggable'

import ImageTile from './ImageTile'

interface ImageSource {
  height: number
  name: string
  width: number
}

const sources: ImageSource[] = [
  {
    height: 1477,
    name: 'portrait1',
    width: 1000,
  },
  {
    height: 681,
    name: 'landscape',
    width: 1298,
  },
]

interface DisplayImage {
  displayHeight: number
  displayWidth: number
  name: string
}

// how to calculate ratio?
// 1000 / 1477 = 0.6777

interface Dimensions {
  height: number
  width: number
}

export default function ImageTiles() {
  const [container, setContainer] = useState<Dimensions>({
    height: 0,
    width: 0,
  })

  //const [images, setImages] = useState<Displ
  const containerDimensions = () => {
    const height = window.innerHeight * 0.6
    const width = window.innerWidth - 32
    setContainer({ height, width })
  }

  useEffect(() => {
    function handleResize() {
      containerDimensions()
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'black',
          height: container.height,
          width: container.width,
        }}
      >
        <Box
          sx={{
            backgroundColor: 'grey',
            height: '100%',
            width: '100%',
          }}
        >
          <ImageTile backgroundColor="green" height={250} width={450} />
          <ImageTile backgroundColor="pink" height={450} width={250} />
        </Box>
      </Box>
    </Box>
  )
}
