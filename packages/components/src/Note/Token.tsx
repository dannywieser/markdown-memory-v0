import { MarkedToken } from 'marked'
import { ReactNode } from 'react'

import { TokenProps } from './Note.types'
import components from './Token.components'

export default function Token({ token, note }: TokenProps) {
  const { type } = token
  const typeComponent = components[type]
  return typeComponent
    ? (typeComponent(token as MarkedToken, note) as ReactNode)
    : ((<div>unmatched type: {type}</div>) as ReactNode)
}
