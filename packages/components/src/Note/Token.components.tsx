import { MarkedToken, Tokens } from 'marked'

import List from '../List/List'
import ListItem from '../List/ListItem'
import Text from '../Text/Text'
import { TextVariant } from '../Text/Text.types'

const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant
const heading = ({ depth, text }: Tokens.Heading) => (
  <Text variant={mapTokenDepthToHeading(depth)}>{text}</Text>
)

const list = ({ items, ordered }: Tokens.List) => {
  return (
    <List ordered={ordered}>
      {items.map(({ text }) => (
        <ListItem>{text}</ListItem>
      ))}
    </List>
  )
}

const space = () => <br />

// TODO: figure out this typing
const components = { heading, list, space } as unknown as {
  [key: string]: (token: MarkedToken) => unknown
}
export default components
