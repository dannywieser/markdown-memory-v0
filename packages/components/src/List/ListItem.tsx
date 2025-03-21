import { SquareCheck, SquareDashed, DotIcon } from 'lucide-react'

import Tokens from '../Token/Tokens'
import { ListItemProps } from './List.types'

const IconSize = 20

// const Bullet = styled.li`
//   display: grid;
//   grid-template-columns: ${IconSize}px 1fr;
//   gap: ${(props) => props.theme.grid}px;
//   align-items: top;
// `

export default function ListItem({ item }: ListItemProps) {
  const { checked, task, tokens } = item
  const TaskIcon = checked ? SquareCheck : SquareDashed
  const Icon = task ? TaskIcon : DotIcon
  return (
    <li>
      <Icon size={IconSize} />
      <span>
        <Tokens tokens={tokens} />
      </span>
    </li>
  )
}
