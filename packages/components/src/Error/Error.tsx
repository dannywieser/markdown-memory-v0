import {
  Box,
  Center,
  Heading,
  Stack,
  Text,
  Icon as ChakraIcon,
} from '@chakra-ui/react'
import { ErrorProps } from './Error.types'
import Icon from '../Icon/Icon'

export function Error({ errorTitle, errorText, errorDetail }: ErrorProps) {
  return (
    <Box bg="bg/80" inset="0" pos="absolute">
      <Center h="full">
        <Stack>
          <Center>
            <ChakraIcon size="2xl" alignContent="center">
              <Icon name={'Annoyed'} />
            </ChakraIcon>
          </Center>
          <Heading>{errorTitle}</Heading>
          <Text>{errorText}</Text>
        </Stack>
      </Center>
    </Box>
  )
}
