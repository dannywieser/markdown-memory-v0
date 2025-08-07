import { Heading, Text } from '@chakra-ui/react'
import { MarkdownNote } from '@markdown-memory/markdown'
import { Tokens as MarkedTokens, Token } from 'marked'
import { ElementType } from 'react'

import { TokensProps } from './Token.types'
import { processChildForSpecialTokens } from './Token.util'

const heading = (token: MarkedTokens.Heading) => {
  const { depth, text } = token
  const headingType = `h${depth}` as ElementType
  return depth > 1 ? <Heading as={headingType}>{text}</Heading> : null
}

const p = (token: MarkedTokens.Paragraph, note?: MarkdownNote) => (
  <p>
    <Tokens note={note} tokens={token.tokens} />
  </p>
)

const text = (token: Token) => {
  const typeToken = token as MarkedTokens.Text
  const fontWeight = token.type === 'strong' ? 'bold' : 'normal'
  const text = processChildForSpecialTokens(typeToken.text)
  return (
    <Text as="span" fontWeight={fontWeight} whiteSpace={'pre-line'}>
      {text}
    </Text>
  )
}

export default function Tokens({ note, tokens }: TokensProps) {
  return (
    tokens &&
    tokens.map((token) => {
      console.log(token)
      switch (token.type) {
        case 'escape':
        case 'strong':
        case 'text':
          return text(token)
        case 'heading':
          return heading(token as MarkedTokens.Heading)
        case 'paragraph':
          return p(token as MarkedTokens.Paragraph, note)
        default:
          return `unmatched token ${token.type}`
      }
    })
  )
}
