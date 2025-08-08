import { Icon, List } from '@chakra-ui/react'
import { CircleCheck, CircleDashed } from 'lucide-react'
import { Tokens as MarkedTokens } from 'marked'

import Tokens from './Tokens'

const TodoItemCompleted = () => (
  <List.Indicator asChild>
    <Icon size="sm">
      <CircleCheck />
    </Icon>
  </List.Indicator>
)

export default function list(token: MarkedTokens.List) {
  const { items, ordered } = token
  const listType = ordered ? 'ol' : 'ul'
  const taskList = items.some(({ task }) => task === true)
  const variant = taskList ? 'plain' : 'marker'
  console.log(token)
  return (
    <List.Root
      align="center"
      as={listType}
      listStylePosition="inside"
      variant={variant}
    >
      {items.map(({ checked, task, tokens }) => (
        <List.Item>
          {task && checked && <TodoItemCompleted />}
          {task && !checked && (
            <List.Indicator asChild>
              <Icon size="sm">
                <CircleDashed />
              </Icon>
            </List.Indicator>
          )}
          <Tokens tokens={tokens} />
        </List.Item>
      ))}
    </List.Root>
  )
}
