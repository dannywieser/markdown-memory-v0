import Text from '../Text/Text'
import { NoteProps } from './Note.types'

export default function Note({ note }: NoteProps) {
  const { title } = note
  return <Text variant="h1">{title}</Text>
}
