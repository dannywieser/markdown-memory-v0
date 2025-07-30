import { Flex, Skeleton, Stat } from '@chakra-ui/react'
import { useDay } from '@markdown-memory/services'
import { currentDateNoYear } from '@markdown-memory/utilities/date'

import HashTag from '../HashTag/HashTag'

export function EntriesOnThisDay() {
  const day = currentDateNoYear()
  const { data, isPending } = useDay({ day })

  if (isPending || !data) {
    return <Skeleton height={100} />
  }

  const { entries, tags } = data
  const label = `On This Day | ${day}`

  return (
    <Stat.Root borderWidth="1px" p="2" rounded="sm">
      <Stat.Label>{label}</Stat.Label>
      <Stat.ValueText>{entries}</Stat.ValueText>
      <Flex gap="2" wrap="wrap">
        {tags.map(({ count, value }) => (
          <HashTag
            count={count}
            key={`${value}-${day}`}
            text={value}
            to={`/tags/${value}?day=${day}`}
          />
        ))}
      </Flex>
    </Stat.Root>
  )
}
