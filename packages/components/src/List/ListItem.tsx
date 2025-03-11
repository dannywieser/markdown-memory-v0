import styled from '@emotion/styled'
import { SquareCheck, SquareDashed, CircleSmallIcon } from 'lucide-react'

import Text from '../Text/Text'
import { ListItemProps } from './List.types'

const IconSize = 20

const Bullet = styled.li`
  display: grid;
  grid-template-columns: ${IconSize}px 1fr;
  gap: ${(props) => props.theme.grid}px;
`

export default function ListItem({ item }: ListItemProps) {
  const { checked, task, text } = item
  const TaskIcon = checked ? SquareCheck : SquareDashed
  const Icon = task ? TaskIcon : CircleSmallIcon

  return (
    <Bullet>
      <Icon size={IconSize} />
      <Text>{text}</Text>
    </Bullet>
  )
}
