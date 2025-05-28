import { Token as MarkedToken } from 'marked'

import Token from '../Token/Token'
import useStyles from './Note.styles'
import { NoteProps } from './Note.types'

const filterHeader = (tokens: MarkedToken[]): MarkedToken[] => {
  const firstHeadingIndex = tokens.findIndex(
    ({ type }: MarkedToken) => type === 'heading'
  )
  return tokens.filter((_token, i) => firstHeadingIndex !== i)
}

export default function Note({ note, suppressHeader = false }: NoteProps) {
  const { id, tokens } = note
  const { card, root } = useStyles()
  const key = (index: number) => `${id}-${index}`
  const filteredTokens = suppressHeader ? filterHeader(tokens) : tokens

  return (
    <div className={root}>
      <div className={card}>
        {filteredTokens.map((token, index) => (
          <Token key={key(index)} note={note} token={token} />
        ))}
      </div>
    </div>
  )
}
