import {
  Card,
  Icon as ChakraIcon,
  Flex,
  Heading,
  Link,
  LinkOverlay,
  Skeleton,
} from '@chakra-ui/react'
import { useNote } from '@markdown-memory/services'
import Tokens from '../Token/Tokens'
import Icon from '../Icon/Icon'

export function RandomNoteCard() {
  const { data: randomNote, isPending } = useNote('random')

  if (isPending || !randomNote) {
    return <Skeleton height={100} />
  }

  const { tokens, title, id } = randomNote
  const headingText = `random | ${title}`

  return (
    <Card.Root h="full">
      <Card.Header padding={2}>
        <Flex gap="4" justify="space-between">
          <Heading size="sm">{headingText}</Heading>
          <Icon name={'Dices'} />
        </Flex>
      </Card.Header>
      <Card.Body color="fg.muted" padding={2}>
        <Tokens tokens={tokens} />
      </Card.Body>
      <Card.Footer justifyContent="flex-end" padding={2}>
        <LinkOverlay asChild href="#">
          <Link href={`/note/${id}`} variant="underline">
            open note
          </Link>
        </LinkOverlay>
      </Card.Footer>
    </Card.Root>
  )
}
