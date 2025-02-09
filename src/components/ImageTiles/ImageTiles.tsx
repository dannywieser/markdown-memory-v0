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

const splitSources = (sources: ImageSource[]) => {
  const perChunk = 2
  return sources.reduce(
    (splitArray: Array<ImageSource[]>, item: ImageSource, index) => {
      const chunkIndex = Math.floor(index / perChunk)

      if (!splitArray[chunkIndex]) {
        splitArray[chunkIndex] = [] // start a new chunk
      }

      splitArray[chunkIndex].push(item)

      return splitArray
    },
    []
  )
}

const sourceGroups = splitSources(sources)

interface DisplayImage {
  displayHeight: number
  displayWidth: number
  name: string
}

// how to calculate ratio?
// 1000 / 1477 = 0.6777

export default function ImageTiles() {
  const [width, setWidth] = useState(0)
  const [images, setImages] = useState<DisplayImage[]>([])
  const myRef = useRef<HTMLElement>(null)
  useEffect(() => {
    function handleResize() {
      if (myRef && myRef.current) {
        const containerWidth = myRef.current.getBoundingClientRect().width - 4
        setWidth(containerWidth)
        const images: DisplayImage[] = []
        sourceGroups.forEach((group: ImageSource[]) => {
          if (group.length === 2) {
            const { height: height1, name: name1, width: width1 } = group[0]
            const { height: height2, name: name2, width: width2 } = group[1]
            const totalWidth = width1 + width2
            const maxHeight = Math.min(height1, height2)

            // so I know that one image is taller than the other and will need to be adjusted.
            // but the trouble is I don't know how much until I know the target size of the shorter image

            if (height1 > maxHeight || height2 > maxHeight) {
              console.log(`max condition`)

              // starting point: determine the layout which places the images correctly with no resizing
              const widthpct1 = width1 / totalWidth
              const widthpct2 = width2 / totalWidth
              // console.log(widthpct1, widthpct2)

              const heightpct1 = maxHeight / height1
              const heightpct2 = maxHeight / height2
              console.log(heightpct1, heightpct2)

              // calculate width based on the height adjustment, but also the width adjustment
              // const displayWidth1 = percent1 * (width1 * widthpct1)
              // const displayHeight1 = percent1 * (height1 * widthpct1)
              // const displayWidth2 = percent2 * (width2 * widthpct2)
              // const displayHeight2 = percent2 * (height2 * widthpct2)

              images.push({
                displayHeight: height1 * heightpct1,
                displayWidth: width1 * heightpct1,
                name: name1,
              })

              images.push({
                displayHeight: height2 * heightpct2,
                displayWidth: width2 * heightpct2,
                name: name2,
              })
              return
            }
            // } else {
            //   // images both need to fit into width of container, getting a percentage of it based on their width
            //   const percent1 = width1 / totalWidth
            //   const percent2 = width2 / totalWidth

            //   const maxHeight = Math.min(height1, height2)

            //   const displayWidth1 = percent1 * containerWidth
            //   const displayHeight1 = percent1 * height1
            //   const displayWidth2 = percent2 * containerWidth
            //   const displayHeight2 = percent2 * height2
            // }

            // images.push({
            //   displayHeight: displayHeight1,
            //   displayWidth: displayWidth1,
            //   name: name1,
            // })

            // images.push({
            //   displayHeight: displayHeight2,
            //   displayWidth: displayWidth2,
            //   name: name2,
            // })
          }
        })
        console.log(images)
        setImages(images)
        // if
        // // TODO: how to track current layout?

        // // we only want the image to be at most 120% larger than current viewport
        // // this avoids scrolling through really large images
        // const maxHeight = window.innerHeight * 1.2

        // const displayWidth = containerWidth < width ? containerWidth : width
        // console.log(
        //   `containerWidth ${containerWidth} displayWidth ${displayWidth}`
        // )
        // const ratio = displayWidth / width
        // const displayHeight = height * ratio
        // if (displayHeight > maxHeight) {
        //   const displayHeight = maxHeight
        //   const ratio = displayHeight / height
        //   const displayWidth = width * ratio
        //   images.push({ displayHeight, displayWidth, name })
        //   return
        // }
        // images.push({ displayHeight, displayWidth, name })
        // })
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
