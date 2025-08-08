import { Blockquote, Code, Em, Heading, Link, Text } from '@chakra-ui/react'
import { MarkdownNote } from '@markdown-memory/markdown'
import { Tokens as MarkedTokens, Token } from 'marked'
import { ElementType } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Image from '../Image/Image'
import list from './list'
import { TokensProps } from './Token.types'
import { processChildForSpecialTokens } from './Token.util'

const blockquote = (token: MarkedTokens.Blockquote) => (
  <Blockquote.Root>
    <Blockquote.Content>
      <Tokens tokens={token.tokens} />
    </Blockquote.Content>
  </Blockquote.Root>
)

const code = ({ text }: MarkedTokens.Code) => (
  <Code as="pre" variant="solid">
    {text}
  </Code>
)

const heading = (token: MarkedTokens.Heading) => {
  const { depth, text } = token
  const headingType = `h${depth}` as ElementType
  return depth > 1 ? (
    <Heading as={headingType} key={uuidv4()}>
      {text}
    </Heading>
  ) : null
}

const image = ({ href }: MarkedTokens.Image) => <Image centerFit href={href} />

const link = ({ href, tokens }: MarkedTokens.Link) => {
  const style = href.includes('/note') ? 'internal' : 'external'
  // backgroundColor: theme.colors.slate[200],
  // color: theme.colors.blue[600],
  // textDecoration: 'none',

  const color = style === 'internal' ? 'secondary' : undefined
  const backgroundColor = style === 'internal' ? 'gray.100' : undefined

  return (
    <Link
      backgroundColor={backgroundColor}
      color={color}
      href={href}
      variant="underline"
    >
      <Tokens tokens={tokens} />
    </Link>
  )
}

const p = (token: MarkedTokens.Paragraph, note?: MarkdownNote) => (
  <p key={uuidv4()}>
    <Tokens note={note} tokens={token.tokens} />
  </p>
)

const space = () => <br />

const text = (token: Token) => {
  const typeToken = token as MarkedTokens.Text
  const fontWeight = token.type === 'strong' ? 'bold' : 'normal'
  const Element = token.type === 'em' ? Em : Text
  const text = processChildForSpecialTokens(typeToken.text)
  return (
    <Element
      as="span"
      fontWeight={fontWeight}
      key={uuidv4()}
      whiteSpace={'pre-line'}
    >
      {text}
    </Element>
  )
}

export default function Tokens({ note, tokens }: TokensProps) {
  return (
    tokens &&
    tokens.map((token) => {
      switch (token.type) {
        case 'blockquote':
          return blockquote(token as MarkedTokens.Blockquote)
        case 'code':
          return code(token as MarkedTokens.Code)
        case 'em':
        case 'escape':
        case 'strong':
        case 'text':
          return text(token)
        case 'heading':
          return heading(token as MarkedTokens.Heading)
        case 'image':
          return image(token as MarkedTokens.Image)
        case 'link':
          return link(token as MarkedTokens.Link)
        case 'list':
          return list(token as MarkedTokens.List)
        case 'paragraph':
          return p(token as MarkedTokens.Paragraph, note)
        case 'space':
          return space()
        default:
          return `unmatched token ${token.type}`
      }
    })
  )
}
