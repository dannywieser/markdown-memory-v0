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
    <Card.Root h="full">
      <Card.Header padding={2}>
        <Flex gap="4" justify="space-between">
          <Heading size="sm">{cardName}</Heading>
          {icon && <Icon name={icon} />}
        </Flex>
      </Card.Header>
      <Card.Body color="fg.muted" padding={2}>
        <ListNoteTitles />
      </Card.Body>
      <Card.Footer justifyContent="flex-end" padding={2}>
        <LinkOverlay asChild href="#">
          <Link href={href} variant="underline">
            view entries
          </Link>
        </LinkOverlay>
      </Card.Footer>
    </Card.Root>
  )
}
