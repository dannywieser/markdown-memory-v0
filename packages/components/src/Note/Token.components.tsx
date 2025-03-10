import { MarkedToken, Tokens } from 'marked'

import Blockquote from '../Blockquote/Blockquote'
import Code from '../Code/Code'
import Link from '../Link/Link'
import List from '../List/List'
import ListItem from '../List/ListItem'
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
  <List ordered={ordered}>
    {items.map(({ text }) => (
      <ListItem>{text}</ListItem>
    ))}
  </List>
)
const space = () => (
  <>
    <br />
    <br />
  </>
)
const text = ({ text }: Tokens.Text) => <Text variant="body">{text}</Text>
const paragraph = ({ tokens }: Tokens.Paragraph) =>
  tokens.map((token) => {
    const typeComponent = components[token.type]
    return typeComponent
      ? typeComponent(token as MarkedToken)
      : `unmatched token ${token.type}`
  })

// TODO: figure out this typing
const components = {
  blockquote,
  code,
  heading,
  image,
  link,
  list,
  paragraph,
  space,
  text,
} as unknown as {
  [key: string]: (token: MarkedToken) => unknown
}
export default components
