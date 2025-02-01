import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'

export default function ImageTiles() {
  const [firstCol, setFirstCol] = useState(0)
  const [secondCol, setSecondCol] = useState(0)
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth - 32
      const second = width < 550 ? width : Math.round(width * 0.7377)
      const first = width < 550 ? width : width - second
      setFirstCol(first)
      setSecondCol(second)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Box
      sx={{
        alignItems: 'start',
        display: 'grid',
        gap: 0,
        gridAutoRows: 'auto',
        gridTemplateColumns: 'repeat(auto-fit, 1px)',
        margin: 1,
      }}
    >
      <Box sx={{ gridColumn: `span ${firstCol}` }}>
        <Box
          component="img"
          src="./examples/portrait.jpeg"
          sx={{
            height: '100%',
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </Box>
      <Box sx={{ gridColumn: `span ${secondCol}` }}>
        <Box
          component="img"
          src="./examples/landscape.jpeg"
          sx={{
            height: '100%',
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </Box>
      <Box sx={{ gridColumn: `span ${firstCol + secondCol}` }}>
        <Box
          component="img"
          src="./examples/landscape2.jpeg"
          sx={{
            height: '100%',
            objectFit: 'contain',
            width: '100%',
          }}
        />
      </Box>
    </Box>
  )
}
