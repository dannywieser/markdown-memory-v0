import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

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

  //const [images, setImages] = useState<DisplayImage[]>([])
  const myRef = useRef<HTMLElement>(null)

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
      ref={myRef}
      sx={{
        height: '100%',
        width: '100%',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'black',
          height: container.height,
          padding: '16px',
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
          {/* {images.map(({ displayHeight, displayWidth, name }) => (
          <Box
            key={name}
            sx={{
              border: '1px solid green',
              height: displayHeight,
              width: displayWidth,
            }}
          >
            {`${name}: ${displayHeight}w${displayWidth}`}
          </Box>
        ))} */}
        </Box>
      </Box>
    </Box>
  )
}
