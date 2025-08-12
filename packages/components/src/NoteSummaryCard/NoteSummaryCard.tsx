import {
  Card,
  Icon as ChakraIcon,
  Em,
  Flex,
  Heading,
  Link,
  LinkOverlay,
  Text,
} from '@chakra-ui/react'

import Icon from '../Icon/Icon'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, href, icon, notes } = props

  const hasNotes = notes && notes.length > 0
  const ListNoteTitles = () =>
    notes && (
      <ul>
        {notes.map(({ id, title }) => (
          <li key={id}>
            <Text>{title}</Text>
          </li>
        ))}
      </ul>
    )

  return (
    <Card.Root minWidth="sm">
      <Card.Header padding={2}>
        <Flex gap="4" justify="space-between">
          <Heading size="sm">{cardName}</Heading>
          {icon && (
            <ChakraIcon color="red.500" marginEnd="auto" size="lg">
              <Icon name={icon} />
            </ChakraIcon>
          )}
        </Flex>
      </Card.Header>
      <Card.Body color="fg.muted" padding={2}>
        {!hasNotes && <Em>No notes found</Em>}
        <ListNoteTitles />
      </Card.Body>
      <Card.Footer justifyContent="flex-end" padding={2}>
        {hasNotes && (
          <LinkOverlay asChild href="#">
            <Link href={href} variant="underline">
              view entries
            </Link>
          </LinkOverlay>
        )}
      </Card.Footer>
    </Card.Root>
  )
}
