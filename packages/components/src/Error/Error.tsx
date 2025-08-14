import { Box, Button, Center, Heading, Stack, Text } from '@chakra-ui/react'
import { ErrorProps } from './Error.types'
import Icon from '../Icon/Icon'

export function Error({ errorTitle }: ErrorProps) {
  return (
    <Box bg="bg/80" inset="0" pos="absolute">
      <Center h="full">
        <Stack>
          <Center>
            <Icon size="2xl" name={'Annoyed'} />
          </Center>
          <Heading>{errorTitle}</Heading>
          <Button>Reload</Button>
        </Stack>
      </Center>
    </Box>
  )
}
