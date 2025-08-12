import { Box, Flex, SimpleGrid, Stat } from '@chakra-ui/react'
import { DateMap } from '@markdown-memory/services'

import { FrequencyMapItemProps, FrequencyMapProps } from './FrequencyMap.types'

const sortDateMap = (dateMap: DateMap) => {
  return Object.entries(dateMap).sort(([dateA], [dateB]) =>
    dateA > dateB ? 0 : -1
  )
}

const getColor = (value: number, rootColor = 'gray') => {
  if (value > 10) return `${rootColor}.950`
  else if (value > 7) return `${rootColor}.900`
  else if (value > 6) return `${rootColor}.800`
  else if (value > 5) return `${rootColor}.700`
  else if (value > 4) return `${rootColor}.600`
  else if (value > 3) return `${rootColor}.500`
  else if (value > 2) return `${rootColor}.400`
  else if (value > 1) return `${rootColor}.300`
  else return `${rootColor}.50`
}

const FrequencyMapItem = ({
  createdCount,
  date,
  modifiedCount,
}: FrequencyMapItemProps) => {
  const height = 5
  const total = createdCount + modifiedCount
  const modifiedHeight = (modifiedCount / total) * height
  const createdHeight = (createdCount / total) * height
  return (
    <Flex direction="column" height="100%">
      <Box
        backgroundColor={getColor(createdCount)}
        height={`${createdHeight}px`}
        id={`${date}-created`}
        width="100%"
      ></Box>
      <Box
        backgroundColor={getColor(modifiedCount)}
        height={`${modifiedHeight}px`}
        id={`${date}-modified`}
        width="100%"
      ></Box>
    </Flex>
  )
}

export default function FrequencyMap({ stats }: FrequencyMapProps) {
  const { dateMap, totalEntries } = stats
  const entries = Object.keys(dateMap).length
  const columns = entries > 50 ? 50 : entries
  const sorted = sortDateMap(dateMap)

  return (
    <Stat.Root borderWidth="1px" p="2" rounded="sm" h="full">
      <Stat.Label>entries | all</Stat.Label>
      <Stat.ValueText>{totalEntries}</Stat.ValueText>

      <SimpleGrid columns={columns} gap="3px">
        {sorted.map(([key, { createdCount, modifiedCount }]) => (
          <FrequencyMapItem
            createdCount={createdCount}
            date={key}
            key={key}
            modifiedCount={modifiedCount}
          />
        ))}
      </SimpleGrid>
    </Stat.Root>
  )
}
