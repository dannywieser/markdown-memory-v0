import { Token as MarkedToken } from 'marked'

import Box from '../Box/Box'
import { NoteProps } from './Note.types'
import Token from './Token'

const filterHeader = (tokens: MarkedToken[]): MarkedToken[] => {
  const firstHeadingIndex = tokens.findIndex(
    ({ type }: MarkedToken) => type === 'heading'
  )
  return tokens.filter((_token, i) => firstHeadingIndex !== i)
}

export default function Note({ note, suppressHeader = false }: NoteProps) {
  const { tokens, id } = note
  const key = (index: number) => `${id}-${index}`
  const filteredTokens = suppressHeader ? filterHeader(tokens) : tokens

  return (
    <Box p={4}>
      {filteredTokens.map((token, index) => (
        <Token token={token} key={key(index)} />
      ))}
    </Box>
  )
}
