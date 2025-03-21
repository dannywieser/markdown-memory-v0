import { MarkedToken } from 'marked'

import components from './Token.components'
import { TokensProps } from './Token.types'

export default function Tokens({ tokens, note }: TokensProps) {
  return tokens.map((token) => {
    const typeComponent = components[token.type]
    return typeComponent
      ? typeComponent(token as MarkedToken, note)
      : `unmatched token ${token.type}`
  }) as React.ReactNode[]
}
