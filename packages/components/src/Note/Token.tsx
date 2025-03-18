import { MarkedToken } from 'marked'
import { ReactNode } from 'react'

import { TokenProps } from './Note.types'
import components from './Token.components'

export default function Token({ token }: TokenProps) {
  const { type } = token
  console.log(token)
  const typeComponent = components[type]
  return typeComponent
    ? (typeComponent(token as MarkedToken) as ReactNode)
    : ((<div>unmatched type: {type}</div>) as ReactNode)
}
