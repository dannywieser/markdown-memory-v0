import { MarkedToken } from 'marked'

import { TokenProps } from './Note.types'
import components from './Token.components'

export default function Token({ token }: TokenProps) {
  const { type } = token
  const typeComponent = components[type]
  return typeComponent ? (
    typeComponent(token as MarkedToken)
  ) : (
    <div>unmatched type: {type}</div>
  )
}
