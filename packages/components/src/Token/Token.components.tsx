import { MarkdownNote } from '@markdown-memory/markdown'
import { MarkedToken, Tokens as MarkedTokens } from 'marked'

import Blockquote from '../Blockquote/Blockquote'
import Code from '../Code/Code'
import Link from '../Link/Link'
import List from '../List/List'
import NoteHeader from '../NoteHeader/NoteHeader'
import Text from '../Text/Text'
import Tokens from './Tokens'

const blockquote = ({ text }: MarkedTokens.Blockquote) => (
  <Blockquote text={text} />
)
const br = () => <br />
const code = ({ text, lang }: MarkedTokens.Code) => (
  <Code code={text} language={lang} />
)
const heading = (token: MarkedTokens.Heading, note: MarkdownNote) => (
  <NoteHeader token={token} note={note} />
)
const image = ({ href, text }: MarkedTokens.Image) => 'image'
const link = ({ href, text }: MarkedTokens.Link) => (
  <Link href={href}>{text}</Link>
)
const list = ({ items, ordered }: MarkedTokens.List) => (
  <List ordered={ordered} items={items} />
)
const space = () => (
  <>
    <br />
    <br />
  </>
)
const paragraph = ({ tokens }: MarkedTokens.Paragraph, note: MarkdownNote) => (
  <Tokens tokens={tokens} note={note} />
)

const text = (
  {
    text,
    tokens,
    type,
  }: MarkedTokens.Text | MarkedTokens.Strong | MarkedTokens.Em,
  note: MarkdownNote
) =>
  tokens ? (
    <Text container={type}>
      <Tokens tokens={tokens} note={note} />
    </Text>
  ) : (
    <Text container={type} variant="body">
      {text}
    </Text>
  )

// TODO: figure out this typing
const components = {
  blockquote,
  br,
  code,
  em: text,
  escape: text,
  heading,
  image,
  link,
  list,
  paragraph,
  strong: text,
  space,
  text,
} as unknown as {
  [key: string]: (token: MarkedToken, note?: MarkdownNote) => unknown
}
export default components
