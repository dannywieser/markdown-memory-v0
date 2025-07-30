import { Badge, Box, Text } from '@chakra-ui/react'

import { HashTagProps } from './HashTag.types'

const HASH_SYMBOL = '#'

export default function HashTag({ count, text }: HashTagProps) {
  const Count = () => {
    if (count && count > 0) {
      return (
        <Box borderRadius="sm" borderWidth={1} pl={2} pr={2}>
          <Text fontSize="x-small">{count}</Text>
        </Box>
      )
    }
    return null
  }

  return (
    <Badge colorPalette="gray" size="lg" variant="subtle">
      <Text color="gray.400" fontSize="xx-small">
        {HASH_SYMBOL}
      </Text>
      <Text fontSize="smaller" fontWeight="bolder">
        {text}
      </Text>
      <Count />
    </Badge>
  )
}
