import { Box, Flex, SimpleGrid } from '@chakra-ui/react'

interface ItemProps {
  count: number
  index: number
}

const Item = ({ count, index }: ItemProps) => {
  const maxCount = 20
  const percent = count / maxCount

  const maxHeight = 10
  const height = count > 20 ? `${maxHeight}px` : `${10 * percent}px`

  let color = 'blue.500'

  // TODO: improve
  if (count > 18) {
    color = 'blue.800'
  }
  if (count > 15) {
    color = 'blue.700'
  }
  if (count > 10) {
    color = 'blue.600'
  }

  const borderWidth = count > 0 ? '1px' : 0

  return (
    <Flex align="flex-end" height="100%">
      <Box
        backgroundColor={color}
        borderColor={color}
        borderWidth={borderWidth}
        height={height}
        width="100%"
      ></Box>
    </Flex>
  )
}

export default function FrequencyMap() {
  const elements = fillArrayWithRandomNumbers(500)
  console.log(elements)

  const columns = elements.length > 50 ? 50 : elements.length

  return (
    <Box borderWidth="1px" p="2" rounded="sm">
      <SimpleGrid columns={columns} gap="0.5px">
        {elements.map((val: number, index: number) => (
          <Item count={val} index={index} key={index} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

function fillArrayWithRandomNumbers(size: number) {
  const arr = []
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 20) + 0)
  }
  return arr
}
