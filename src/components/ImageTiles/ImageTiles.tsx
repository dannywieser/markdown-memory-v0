import { Box } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const sources = [
  {
    displayHeight: 0,
    displayWidth: 0,
    height: 1477,
    name: 'portrait1',
    width: 1000,
  },
]

interface DisplayImage {
  displayHeight: number
  displayWidth: number
  name: string
}

// how to calculate ratio?
// 1000 / 1477 = 0.6777

export default function ImageTiles() {
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [images, setImages] = useState<DisplayImage[]>([])
  const myRef = useRef<HTMLElement>(null)
  useEffect(() => {
    function handleResize() {
      if (myRef && myRef.current) {
        const containerHeight =
          myRef.current.getBoundingClientRect().height - 96
        const containerWidth = myRef.current.getBoundingClientRect().width - 4
        //const innerHeight = fullHeight / 2
        setHeight(containerHeight)
        setWidth(containerWidth)
        const images: DisplayImage[] = []
        console.log(`containerWidth ${containerWidth}`)

        sources.forEach(({ height, name, width }) => {
          // TODO: how to track current layout?

          // we only want the image to be at most 120% larger than current viewport
          // this avoids scrolling through really large images
          const maxHeight = window.innerHeight * 1.2

          const displayWidth = containerWidth < width ? containerWidth : width
          console.log(
            `containerWidth ${containerWidth} displayWidth ${displayWidth}`
          )
          const ratio = displayWidth / width
          const displayHeight = height * ratio
          if (displayHeight > maxHeight) {
            const displayHeight = maxHeight
            const ratio = displayHeight / height
            const displayWidth = width * ratio
            images.push({ displayHeight, displayWidth, name })
            return
          }
          images.push({ displayHeight, displayWidth, name })
        })
        setImages(images)
      }
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
          display: 'flex',
          justifyContent: 'center',
          width,
        }}
      >
        {images.map(({ displayHeight, displayWidth, name }) => (
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
        ))}
      </Box>
    </Box>
  )
}
