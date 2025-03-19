import Text from '../Text/Text'
import { TextVariant } from '../Text/Text.types'
import { NoteHeaderProps } from './NoteHeader.types'

export const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant

export default function NoteHeader(props: NoteHeaderProps) {
  const { token, note } = props
  const { depth, text } = token
  return (
    <>
      <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
      {note.externalUrl && <a href={note.externalUrl}>open in bear</a>}
    </>
  )
}
