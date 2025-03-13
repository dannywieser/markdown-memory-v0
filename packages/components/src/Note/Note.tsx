import styled from '@emotion/styled'
import { Token as MarkedToken } from 'marked'

import { NoteProps } from './Note.types'
import Token from './Token'

const filterHeader = (tokens: MarkedToken[]): MarkedToken[] => {
  const firstHeadingIndex = tokens.findIndex(
    ({ type }: MarkedToken) => type === 'heading'
  )
  return tokens.filter((_token, i) => firstHeadingIndex !== i)
}

const NoteContainer = styled.div`
  padding-left: 3%;
  padding-right: 3%;
  @media (min-width: 900px) {
    padding-left: 8%;
    padding-right: 8%;
  }
`

export default function Note({
  note,
  suppressHeader = false,
  showLink = false,
}: NoteProps) {
  const { tokens, id } = note
  const key = (index: number) => `${id}-${index}`
  const filteredTokens = suppressHeader ? filterHeader(tokens) : tokens

  const noteUrl = `/note/${id}`

  return (
    <NoteContainer>
      {showLink && <a href={noteUrl}>open</a>}
      {filteredTokens.map((token, index) => (
        <Token token={token} key={key(index)} />
      ))}
    </NoteContainer>
  )
}
