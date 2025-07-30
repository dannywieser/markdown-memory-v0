import { Badge, Stack, Stat, Text } from '@chakra-ui/react'

export function EntriesOnThisDay() {
  return (
    <Stat.Root borderWidth="1px" p="2" rounded="sm">
      <Stat.Label>On This Day | 07.22</Stat.Label>
      <Stat.ValueText>10</Stat.ValueText>
      <Stack direction="row">
        <Badge colorPalette="gray" size="lg" variant="subtle">
          <Text color="gray.400">#</Text>
          <Text fontWeight="bolder">daily</Text> 4
        </Badge>
        <Badge colorPalette="gray" size="lg" variant="subtle">
          <Text color="gray.400">#</Text>
          <Text fontWeight="bold">daily@work</Text> 6
        </Badge>
      </Stack>
    </Stat.Root>
  )
}
