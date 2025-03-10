import { MarkedToken, Tokens } from 'marked'

import Blockquote from '../Blockquote/Blockquote'
import Link from '../Link/Link'
import List from '../List/List'
import ListItem from '../List/ListItem'
import Text from '../Text/Text'
import { TextVariant } from '../Text/Text.types'

const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant
const heading = ({ depth, text }: Tokens.Heading) => (
  <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
)

const blockquote = ({ text }: Tokens.Blockquote) => {
  return <Blockquote text={text} />
}

const image = ({ href, text }: Tokens.Image) => 'image'

const link = ({ href, text }: Tokens.Link) => <Link href={href}>{text}</Link>

const list = ({ items, ordered }: Tokens.List) => {
  return (
    <List ordered={ordered}>
      {items.map(({ text }) => (
        <ListItem>{text}</ListItem>
      ))}
    </List>
  )
}

const text = ({ text }: Tokens.Text) => <Text variant="body">{text}</Text>

const paragraph = ({ tokens }: Tokens.Paragraph) => {
  return tokens.map((token) => {
    const typeComponent = components[token.type]
    return typeComponent
      ? typeComponent(token as MarkedToken)
      : `unmatched token ${token.type}`
  })
}

const space = () => (
  <>
    <br />
    <br />
  </>
)

// TODO: figure out this typing
const components = {
  blockquote,
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
