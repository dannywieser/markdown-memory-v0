import { Card, Flex, Heading } from '@chakra-ui/react'

import OpenExternal from '../OpenExternal/OpenExternal'
import Tokens from '../Token/Tokens'
import { NoteProps } from './Note.types'

export default function Note({ note }: NoteProps) {
  const { externalUrl, id, source, title, tokens } = note

  const margins = { lg: '10%', md: '6%', sm: 1 }
  return (
    <Card.Root gap="2" mb={1} ml={margins} mr={margins} mt={1}>
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
        <Tokens tokens={tokens} />
      </Card.Body>
    </Card.Root>
  )
}
