import { Box, Image as ChakraImage } from '@chakra-ui/react'
import { ImageProps } from './Image.types'

export default function Image({ h, href, op = 'noop', w }: ImageProps) {
  const width = w ? `&w=${w}` : ''
  const height = h ? `&h=${h}` : ''
  const imageUrl = `images/display?path=${href}&op=${op}${width}${height}`

  const maxWidth = { lg: '50%', md: '75%', sm: '100%' }

  return (
    <Box p={2}>
      <ChakraImage
        fit="contain"
        margin="auto"
        maxWidth={maxWidth}
        rounded="md"
        src={imageUrl}
      />
    </Box>
  )
}
