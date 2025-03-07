import Box from '../Box/Box'
import { NoteProps } from './Note.types'
import Token from './Token'

export default function Note({ note }: NoteProps) {
  const { tokens, id } = note
  const key = (index: number) => `${id}-${index}`
  return (
    <Box b={1} p={2}>
      {tokens.map((token, index) => (
        <Token token={token} key={key(index)} />
      ))}
    </Box>
  )
}
