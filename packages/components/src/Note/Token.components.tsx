import { MarkedToken, Token, Tokens } from 'marked'

import Blockquote from '../Blockquote/Blockquote'
import Code from '../Code/Code'
import Link from '../Link/Link'
import List from '../List/List'
import Text from '../Text/Text'
import { mapTokenDepthToHeading } from './Token.utilities'

const blockquote = ({ text }: Tokens.Blockquote) => <Blockquote text={text} />
const code = ({ text, lang }: Tokens.Code) => {
  return <Code code={text} language={lang} />
}
const heading = ({ depth, text }: Tokens.Heading) => (
  <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
)
const image = ({ href, text }: Tokens.Image) => 'image'
const link = ({ href, text }: Tokens.Link) => <Link href={href}>{text}</Link>
const list = ({ items, ordered }: Tokens.List) => (
  <List ordered={ordered} items={items} />
)
const space = () => (
  <>
    <br />
    <br />
  </>
)

const mapTokens = (tokens: Token[]) =>
  tokens.map((token) => {
    const typeComponent = components[token.type]
    return typeComponent
      ? typeComponent(token as MarkedToken)
      : `unmatched token ${token.type}`
  })

const strong = ({ text, tokens }: Tokens.Text) => {
  // TODO: how to carry strong token parent into children
  return tokens ? mapTokens(tokens) : <Text variant="strong">{text}</Text>
}

const text = ({ text, tokens }: Tokens.Text) =>
  tokens ? mapTokens(tokens) : <Text variant="body">{text}</Text>
const paragraph = ({ tokens }: Tokens.Paragraph) => mapTokens(tokens)

// TODO: figure out this typing
const components = {
  blockquote,
  code,
  heading,
  image,
  link,
  list,
  paragraph,
  strong,
  space,
  text,
} as unknown as {
  [key: string]: (token: MarkedToken) => unknown
}
export default components
