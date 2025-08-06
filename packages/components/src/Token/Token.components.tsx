import { Heading, Text } from '@chakra-ui/react'
import { MarkdownNote } from '@markdown-memory/markdown'
import { MarkedToken, Tokens as MarkedTokens } from 'marked'
import { ElementType } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Blockquote from '../Blockquote/Blockquote'
import Code from '../Code/Code'
import Hr from '../Hr/Hr'
import Image from '../Image/Image'
import Link from '../Link/Link'
import List from '../List/List'
import Tokens from './Tokens'

const tokenKey = uuidv4

const blockquote = ({ text }: MarkedTokens.Blockquote) => (
  <Blockquote text={text} />
)
const br = () => <br />
const code = ({ lang, text }: MarkedTokens.Code) => (
  <Code code={text} language={lang} />
)
const heading = (token: MarkedTokens.Heading) => {
  const { depth, text } = token
  const headerLevel = `h${depth}` as ElementType
  // Heading Level 1 is always handling differently
  return depth > 1 ? <Heading as={headerLevel}>{text}</Heading> : null
}
const hr = () => <Hr />
const image = ({ href }: MarkedTokens.Image) => <Image centerFit href={href} />
const link = ({ href, text }: MarkedTokens.Link) => (
  <Link href={href} key={tokenKey()}>
    {text}
  </Link>
)
const list = ({ items, ordered }: MarkedTokens.List) => (
  <List items={items} key={tokenKey()} ordered={ordered} />
)
const space = () => (
  <>
    <br />
    <br />
  </>
)
const paragraph = ({ tokens }: MarkedTokens.Paragraph, note: MarkdownNote) => (
  <Tokens note={note} tokens={tokens} />
)

const text = (
  { text, tokens }: MarkedTokens.Em | MarkedTokens.Strong | MarkedTokens.Text,
  note: MarkdownNote
) =>
  tokens ? (
    <Tokens note={note} tokens={tokens} />
  ) : (
    <Text display={'inline'} key={uuidv4()}>
      {text}
    </Text>
  )

// TODO: figure out this typing
const components = {
  // blockquote,
  // br,
  // code,
  // codespan: text,
  // del: text,
  // em: text,
  // escape: text,
  heading,
  // hr,
  // image,
  //link,
  //list,
  // paragraph,
  //space,
  // strong: text,
  // text,
} as unknown as {
  [key: string]: (token: MarkedToken, note?: MarkdownNote) => unknown
}
export default components
