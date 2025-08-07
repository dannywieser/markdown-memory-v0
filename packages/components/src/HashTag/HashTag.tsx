import { Badge, Box, Text } from '@chakra-ui/react'
import { Link } from 'react-router'

import { HashTagProps } from './HashTag.types'

const HASH_SYMBOL = '#'

export default function HashTag({ count, text, to = '' }: HashTagProps) {
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

  const Tag = () => (
    <Badge colorPalette="gray" size="lg" variant="subtle">
      <Text fontSize="xx-small" fontWeight="extralight">
        {HASH_SYMBOL}
      </Text>
      <Text color="primary" fontSize="small" fontWeight="bolder">
        {text}
      </Text>
      <Count />
    </Badge>
  )

  return to ? (
    <Link to={to}>
      <Tag />
    </Link>
  ) : (
    <Tag />
  )
}
