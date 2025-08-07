import { Image as ChakraImage } from '@chakra-ui/react'

import { ImageProps } from './Image.types'

export default function Image({ h, href, op = 'noop', w }: ImageProps) {
  const width = w ? `&w=${w}` : ''
  const height = h ? `&h=${h}` : ''
  const imageUrl = `images/display?path=${href}&op=${op}${width}${height}`

  return (
    <ChakraImage
      fit="contain"
      margin="auto"
      maxWidth="50%"
      rounded="md"
      src={imageUrl}
    />
  )
}
