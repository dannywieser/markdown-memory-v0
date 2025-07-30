import { Badge, Flex, SimpleGrid, Stack, Stat, Text } from '@chakra-ui/react'
import { useDay } from '@markdown-memory/services'
import { currentDateNoYear } from '@markdown-memory/utilities/date'

import HashTag from '../HashTag/HashTag'

export function EntriesOnThisDay() {
  const day = currentDateNoYear()
  const { data, isPending } = useDay({ day })
  console.log(data)

  if (isPending || !data) {
    return 'loading'
  }

  const { entries, tags } = data
  const label = `On This Day | ${day}`

  return (
    <Stat.Root borderWidth="1px" p="2" rounded="sm">
      <Stat.Label>{label}</Stat.Label>
      <Stat.ValueText>{entries}</Stat.ValueText>
      <Flex gap="2" wrap="wrap">
        {tags.map(({ count, value }) => (
          <HashTag count={count} text={value} />
        ))}
      </Flex>
    </Stat.Root>
  )
}
