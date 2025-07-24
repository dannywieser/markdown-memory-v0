import { HStack, Stat } from '@chakra-ui/react'
import { Stats } from '@markdown-memory/services'
import { Badge } from 'lucide-react'

interface StatProps {
  stats: Stats
}

export const TotalEntries = ({ stats: { totalEntries = 0 } }: StatProps) => (
  <Stat.Root borderWidth="1px" p="2" rounded="sm">
    <Stat.Label>Entries | All</Stat.Label>
    <Stat.ValueText>{totalEntries}</Stat.ValueText>
  </Stat.Root>
)

const EntriesThisWeek = () => (
  <Stat.Root borderWidth="1px" p="2" rounded="sm">
    <Stat.Label>Entries | Last 7 days</Stat.Label>
    <HStack>
      <Stat.ValueText>10</Stat.ValueText>
      <Badge colorPalette="green" gap="0">
        <Stat.UpIndicator />
        12%
      </Badge>
    </HStack>
  </Stat.Root>
)

const EntriesOnThisDay = () => (
  <Stat.Root borderWidth="1px" p="2" rounded="sm">
    <Stat.Label>On This Day | 07.22</Stat.Label>
    <Stat.ValueText>6</Stat.ValueText>
  </Stat.Root>
)
