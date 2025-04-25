import { ChevronRight, SquareCheck, SquareDashed } from 'lucide-react'

import Text from '../Text/Text'
import Tokens from '../Token/Tokens'
import useStyles, { IconSize } from './List.styles'
import { ListItemProps } from './List.types'

export default function ListItem(props: ListItemProps) {
  const { index, item, ordered } = props
  const { bulletOrdered, bulletUnordered, listitem } = useStyles()
  const { checked, task, tokens } = item

  // The bullet will either be:
  // 1. A completed or uncompleted task
  const TaskIcon = checked ? SquareCheck : SquareDashed
  // 2. A normal bullet
  const Icon = task ? TaskIcon : ChevronRight
  // 3. Numerical Text for ordered lists
  const indexText = `${index + 1}.`

  const bulletClass = ordered ? bulletOrdered : bulletUnordered

  return (
    <li className={listitem}>
      <span className={bulletClass}>
        {ordered ? (
          <Text variant="text">{indexText}</Text>
        ) : (
          <Icon size={IconSize} />
        )}
      </span>
      <span>
        <Tokens tokens={tokens} />
      </span>
    </li>
  )
}
