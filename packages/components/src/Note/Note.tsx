import { Card, Flex, Heading } from '@chakra-ui/react'

import OpenExternal from '../OpenExternal/OpenExternal'
import Token from '../Token/Token'
import { NoteProps } from './Note.types'

export default function Note({ note }: NoteProps) {
  const { externalUrl, id, source, title, tokens } = note
  const key = (index: number) => `${id}-${index}`

  const margins = { lg: '10%', md: '6%', sm: 1 }
  return (
    <Card.Root gap="2" ml={margins} mr={margins} mt={1}>
      <Card.Header>
        <Flex gap="2" justify="space-between">
          <Heading as="h1">{title}</Heading>
          {externalUrl && (
            <OpenExternal noteId={id} source={source} url={externalUrl} />
          )}
        </Flex>
      </Card.Header>
      <Card.Body>
        {tokens.map((token, index) => (
          <Token key={key(index)} note={note} token={token} />
        ))}
      </Card.Body>
    </Card.Root>
  )
}
