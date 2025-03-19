import { MarkdownNote } from '@markdown-memory/markdown'
import { MarkedToken, Token, Tokens } from 'marked'

import Blockquote from '../Blockquote/Blockquote'
import Code from '../Code/Code'
import Link from '../Link/Link'
import List from '../List/List'
import NoteHeader from '../NoteHeader/NoteHeader'
import Text from '../Text/Text'

const blockquote = ({ text }: Tokens.Blockquote) => <Blockquote text={text} />
const code = ({ text, lang }: Tokens.Code) => (
  <Code code={text} language={lang} />
)
const heading = (token: Tokens.Heading, note: MarkdownNote) => (
  <NoteHeader token={token} note={note} />
)
const image = ({ href, text }: Tokens.Image) => 'image'
const link = ({ href, text }: Tokens.Link) => <Link href={href}>{text}</Link>
const list = ({ items, ordered }: Tokens.List) => (
  <List ordered={ordered} items={items} />
)
const br = () => <br />

const space = () => (
  <>
    <br />
    <br />
  </>
)

const mapTokens = (tokens: Token[], note: MarkdownNote) =>
  tokens.map((token) => {
    const typeComponent = components[token.type]
    return typeComponent
      ? typeComponent(token as MarkedToken, note)
      : `unmatched token ${token.type}`
  })

const em = ({ text, tokens }: Tokens.Text, note: MarkdownNote) => {
  // TODO: how to carry em token parent into children
  return tokens ? mapTokens(tokens, note) : <Text variant="strong">{text}</Text>
}
const strong = ({ text, tokens }: Tokens.Text, note: MarkdownNote) => {
  // TODO: how to carry strong token parent into children
  return tokens ? mapTokens(tokens, note) : <Text variant="strong">{text}</Text>
}

const text = ({ text, tokens }: Tokens.Text, note: MarkdownNote) =>
  tokens ? mapTokens(tokens, note) : <Text variant="body">{text}</Text>
const paragraph = ({ tokens }: Tokens.Paragraph, note: MarkdownNote) =>
  mapTokens(tokens, note)

// TODO: figure out this typing
const components = {
  blockquote,
  br,
  code,
  em,
  escape: text,
  heading,
  image,
  link,
  list,
  paragraph,
  strong,
  space,
  text,
} as unknown as {
  [key: string]: (token: MarkedToken, note?: MarkdownNote) => unknown
}
export default components
