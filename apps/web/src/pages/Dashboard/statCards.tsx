import { Badge, HStack, Stat } from '@chakra-ui/react'
import { Stats } from '@markdown-memory/services'
interface StatProps {
  stats: Stats
}
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
