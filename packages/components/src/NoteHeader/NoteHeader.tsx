import Text from '../Text/Text'
import { TextVariant } from '../Text/Text.types'
import { NoteHeaderProps } from './NoteHeader.types'

export const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant

export default function NoteHeader(props: NoteHeaderProps) {
  const { token, note } = props
  const { depth, text } = token
  const showExternalLink = depth === 1 && note.externalUrl
  return (
    <>
      <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
      {showExternalLink && <a href={note.externalUrl}>open in bear</a>}
    </>
  )
}
