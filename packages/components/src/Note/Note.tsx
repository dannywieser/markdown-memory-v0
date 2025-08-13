import { Card, Flex, Heading } from '@chakra-ui/react'

import OpenExternal from '../OpenExternal/OpenExternal'
import Tokens from '../Token/Tokens'
import { NoteProps } from './Note.types'

export default function Note({ note, searchTerm }: NoteProps) {
  const { externalUrl, id, source, title, tokens } = note

  return (
    <Card.Root gap="2" variant="subtle" mx={{ base: 1, md: 6, lg: 12 }} mt="1">
      <Card.Header>
        <Flex
          borderBottomWidth="1px"
          borderColor="gray.300"
          borderStyle="solid"
          gap="2"
          justify="space-between"
        >
          <Heading as="h1">{title}</Heading>
          {externalUrl && (
            <OpenExternal noteId={id} source={source} url={externalUrl} />
          )}
        </Flex>
      </Card.Header>
      <Card.Body pt={0}>
        <Tokens tokens={tokens} searchTerm={searchTerm} />
      </Card.Body>
    </Card.Root>
  )
}
