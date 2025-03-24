import Text from '../Text/Text'
import useStyles from './Blockquote.styles'
import { BlockquoteProps } from './Blockquote.types'

export default function Blockquote({ text }: BlockquoteProps) {
  const { root } = useStyles()
  return (
    <blockquote className={root}>
      <Text>{text}</Text>
    </blockquote>
  )
}
