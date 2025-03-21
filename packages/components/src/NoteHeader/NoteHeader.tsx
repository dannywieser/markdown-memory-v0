import OpenExternal from '../OpenExternal/OpenExternal'
import Text from '../Text/Text'
import { TextVariant } from '../Text/Text.types'
import { NoteHeaderProps } from './NoteHeader.types'

export const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant

// const MainHeader = styled['div']`
//   line-height: ${(props) => props.theme.text.lineHeight}em;
//   background-color: ${(props) => props.theme.colors.primary};
//   color: ${(props) => props.theme.colors.contrastText};
//   padding-left: ${(props) => props.theme.grid * 2}px;
//   display: grid;
//   grid-template-columns: 1fr 10%;
//   gap: ${(props) => props.theme.grid}px;
// `

// const NoteTools = styled['div']`
//   display: flex;
//   line-height: ${(props) => props.theme.text.lineHeight}em;
//   padding: ${(props) => props.theme.grid * 2}px;
//   justify-content: center;
//   flex-direction: column;
//   align-items: end;
// `

//const SecondaryHeader = styled['div']``

export default function NoteHeader(props: NoteHeaderProps) {
  const { token, note } = props
  const { depth, text } = token
  const { externalUrl, source, id } = note
  const showExternalLink = depth === 1 && note.externalUrl
  // const Container = depth === 1 ? MainHeader : SecondaryHeader
  return (
    <div>
      <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
      <div>
        {showExternalLink && (
          <OpenExternal url={externalUrl} source={source} noteId={id} />
        )}
      </div>
    </div>
  )
}
