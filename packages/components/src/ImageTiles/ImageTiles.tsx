import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import Draggable from 'react-draggable'

import ImageTile from './ImageTile'

interface ImageSource {
  color: string
  height: number
  width: number
}

const sources: ImageSource[] = [
  {
    color: 'green',
    height: 1477,
    width: 1000,
  },
  {
    color: 'red',
    height: 681,
    width: 1298,
  },
  {
    color: 'blue',
    height: 450,
    width: 300,
  },
]

interface Dimensions {
  height: number
  width: number
}

const calculateSourceArea = (sources: ImageSource[]) =>
  sources.reduce(
    (totalArea: number, { height, width }: ImageSource) =>
      totalArea + height * width,
    0
  )

const resizeImages = (
  sources: ImageSource[],
  width: number,
  height: number
) => {
  // 1. What is total area available in the container?
  const totalArea = width * height
  const imageArea = calculateSourceArea(sources)

  // 2. If images don't fit, what is the ratio we need to fit them all
  const adjust = imageArea > totalArea ? totalArea / imageArea : 1
  console.log(`totalArea ${totalArea} imageArea ${imageArea} adjust ${adjust}`)

  const resized: ImageSource[] = []
  sources.forEach(({ color, height, width }: ImageSource) => {
    const aspectRatio = width / height

    const resizeHeight = adjust * height
    const resizeWidth = resizeHeight * aspectRatio
    console.log(
      `image: ${color}, height: ${height}, width: ${width}, aspectRatio: ${aspectRatio}, resizeHeight: ${resizeHeight}, resizeWidth: ${resizeWidth}`
    )
    resized.push({ color, height: resizeHeight, width: resizeWidth })
  })

  return resized
}

export default function ImageTiles() {
  const containerRef = useRef<HTMLElement>(null)
  const [images, setImages] = useState<ImageSource[]>([])
  const [container, setContainer] = useState<Dimensions>({
    height: 0,
    width: 0,
  })

  //const [images, setImages] = useState<Displ
  const containerDimensions = () => {
    const height = window.innerHeight * 0.6
    const width = window.innerWidth - 64
    setContainer({ height, width })
  }

  useEffect(() => {
    function handleResize() {
      containerDimensions()
      if (containerRef && containerRef.current) {
        const { height, width } = containerRef.current.getBoundingClientRect()
        const resized = resizeImages(sources, width, height)
        setImages(resized)
      }
    }
    window.addEventListener('resize', handleResize)
    setTimeout(() => handleResize(), 500)
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
          padding: '16px',
          width: container.width,
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            backgroundColor: 'grey',
            height: '100%',
            width: '100%',
          }}
        >
          {images.map(({ color, height, width }: ImageSource) => (
            <ImageTile
              backgroundColor={color}
              height={height}
              key={color}
              width={width}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
