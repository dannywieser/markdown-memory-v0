import OpenExternal from '../OpenExternal/OpenExternal'
import Text from '../Text/Text'
import { TextVariant } from '../Text/Text.types'
import useStyles from './NoteHeader.styles'
import { NoteHeaderProps } from './NoteHeader.types'

export const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant

export default function NoteHeader(props: NoteHeaderProps) {
  const { headingTools, mainHeading } = useStyles()
  const { note, token } = props
  const { depth, text } = token
  const { externalUrl, id, source } = note
  const primaryHeading = depth === 1
  const showExternalLink = primaryHeading && externalUrl
  const mainStyle = primaryHeading ? mainHeading : ''
  return (
    <div className={mainStyle}>
      <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
      <div className={headingTools}>
        {showExternalLink && (
          <OpenExternal noteId={id} source={source} url={externalUrl} />
        )}
      </div>
    </div>
  )
}
