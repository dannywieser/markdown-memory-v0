import { Box, Center, Spinner } from '@chakra-ui/react'

export default function CenteredSpinner() {
  return (
    <Box bg="bg/80" inset="0" pos="absolute">
      <Center h="full">
        <Spinner animationDuration="1.2s" borderWidth="6px" size="lg" />
      </Center>
    </Box>
  )
}
