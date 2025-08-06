import {
  Card,
  Icon as ChakraIcon,
  Flex,
  Heading,
  Link,
  LinkOverlay,
} from '@chakra-ui/react'

import Icon from '../Icon/Icon'
import Text from '../Text/Text'
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
    <Card.Root>
      <Card.Header>
        <Flex gap="4" justify="space-between">
          <Heading size="sm">{cardName}</Heading>
          {icon && (
            <ChakraIcon color="red.500" marginEnd="auto" size="lg">
              <Icon name={icon} />
            </ChakraIcon>
          )}
        </Flex>
      </Card.Header>
      <Card.Body color="fg.muted">
        {!hasNotes && <Text variant="em">No notes found</Text>}
        <ListNoteTitles />
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
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
