import styled from '@emotion/styled'
import { SquareCheck, SquareDashed, DotIcon } from 'lucide-react'

import Tokens from '../Token/Tokens'
import { ListItemProps } from './List.types'

const IconSize = 20

const Bullet = styled.li`
  display: grid;
  grid-template-columns: ${IconSize}px 1fr;
  gap: ${(props) => props.theme.grid}px;
  align-items: top;
`

const BulletText = styled.span``

export default function ListItem({ item }: ListItemProps) {
  const { checked, task, tokens } = item
  const TaskIcon = checked ? SquareCheck : SquareDashed
  const Icon = task ? TaskIcon : DotIcon
  return (
    <Bullet>
      <Icon size={IconSize} />
      <BulletText>
        <Tokens tokens={tokens} />
      </BulletText>
    </Bullet>
  )
}
