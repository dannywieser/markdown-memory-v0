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
  <Blockquote.Root key={uuidv4()}>
    <Blockquote.Content>
      <Tokens tokens={token.tokens} />
    </Blockquote.Content>
  </Blockquote.Root>
)

const code = ({ text }: MarkedTokens.Code) => (
  <Code as="pre" key={uuidv4()} variant="solid">
    {text}
  </Code>
)

const heading = (token: MarkedTokens.Heading, searchTerm?: string) => {
  const { depth, text } = token
  const headingType = `h${depth}` as ElementType
  const processedText = processChildForSpecialTokens(text, searchTerm)
  return depth > 1 ? (
    <Heading as={headingType} key={uuidv4()}>
      {processedText}
    </Heading>
  ) : null
}

const image = ({ href }: MarkedTokens.Image) => <Image href={href} />

const link = ({ href, tokens }: MarkedTokens.Link) => {
  const style = href.includes('/note') ? 'internal' : 'external'
  const color = style === 'internal' ? 'secondary' : undefined
  const backgroundColor = style === 'internal' ? 'gray.200' : undefined

  return (
    <Link
      backgroundColor={backgroundColor}
      color={color}
      href={href}
      key={uuidv4()}
      variant="underline"
    >
      <Tokens tokens={tokens} />
    </Link>
  )
}

const p = (
  token: MarkedTokens.Paragraph,
  note?: MarkdownNote,
  searchTerm?: string
) => (
  <p key={uuidv4()}>
    <Tokens note={note} tokens={token.tokens} searchTerm={searchTerm} />
  </p>
)

const space = () => <br key={uuidv4()} />

const text = (token: Token, searchTerm?: string) => {
  const typedToken = token as MarkedTokens.Text
  const as = token.type === 'strong' ? 'strong' : 'span'
  const Element = token.type === 'em' ? Em : Text
  const text = processChildForSpecialTokens(typedToken.text, searchTerm)

  return (
    <Element
      as={as}
      key={uuidv4()}
      whiteSpace="pre-line"
      wordBreak="break-word"
    >
      {typedToken.tokens ? <Tokens tokens={typedToken.tokens} /> : text}
    </Element>
  )
}

export default function Tokens({ note, tokens, searchTerm }: TokensProps) {
  return (
    tokens &&
    tokens.map((token) => {
      switch (token.type) {
        case 'blockquote':
          return blockquote(token as MarkedTokens.Blockquote)
        case 'br':
          return <br />
        case 'code':
          return code(token as MarkedTokens.Code)
        case 'em':
        case 'escape':
        case 'strong':
        case 'text':
          return text(token, searchTerm)
        case 'heading':
          return heading(token as MarkedTokens.Heading, searchTerm)
        case 'hr':
          return <hr />
        case 'image':
          return image(token as MarkedTokens.Image)
        case 'link':
          return link(token as MarkedTokens.Link)
        case 'list':
          return list(token as MarkedTokens.List)
        case 'paragraph':
          return p(token as MarkedTokens.Paragraph, note, searchTerm)
        case 'space':
          return space()
        default:
          return `unmatched token ${token.type}`
      }
    })
  )
}
