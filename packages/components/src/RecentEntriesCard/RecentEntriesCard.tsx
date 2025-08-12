import { Badge, Flex, Stat } from '@chakra-ui/react'
import {
  RecentEntriesCardProps,
  RecentEntryType,
} from './RecentEntriesCard.types'
import {
  DateMap,
  getRecentDateEntries,
  getTotalsForEntries,
  getTrailingDateEntries,
} from '@markdown-memory/services'

const calcDifference = (current: number, trailing: number) =>
  Math.round(((current - trailing) / trailing) * 100)

const buildRecentStats = (
  dateMap: DateMap,
  days: number,
  type: RecentEntryType
) => {
  const recentEntries = getRecentDateEntries(dateMap, days)
  const { created, modified } = getTotalsForEntries(recentEntries)

  const trailingEntries = getTrailingDateEntries(dateMap, days, days + days)
  const { created: trailingCreated, modified: trailingModified } =
    getTotalsForEntries(trailingEntries)

  const createdDifference = calcDifference(created, trailingCreated)
  const modifiedDifference = calcDifference(modified, trailingModified)

  console.log(created, trailingCreated)

  const count = type === 'modified' ? modified : created
  const difference =
    type === 'modified' ? modifiedDifference : createdDifference

  return { count, difference }
}

export function RecentEntriesCard(props: RecentEntriesCardProps) {
  const {
    stats: { dateMap },
    days,
    type,
  } = props

  const { count, difference } = buildRecentStats(dateMap, days, type)

  const label =
    type === 'created'
      ? `created | past ${days} days`
      : `modified | past ${days} days`

  const indicator =
    difference < 0 ? (
      <Badge colorPalette="red" variant="plain" px="0">
        <Stat.DownIndicator />
        {difference}%
      </Badge>
    ) : (
      <Badge colorPalette="green" variant="plain" px="0">
        <Stat.UpIndicator />
        {difference}%
      </Badge>
    )

  return (
    <Stat.Root borderWidth="1px" p="2" rounded="sm">
      <Stat.Label>{label}</Stat.Label>
      <Stat.ValueText>{count}</Stat.ValueText>
      {indicator}
    </Stat.Root>
  )
}
