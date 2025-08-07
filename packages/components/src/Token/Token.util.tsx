import { JSX, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

import HashTag from '../HashTag/HashTag'

/**
 * When we reach the final string child for a text component, this function will parse that string
 * for any special tokens included in it (currently only HashTags). Any matching tokens will be replaced
 * with updated JSX that renders those tokens via the corresponding component.
 */
export function processChildForSpecialTokens(
  child: ReactNode | ReactNode[] | string
) {
  // if child is not a string, don't parse for tags
  if (typeof child !== 'string') {
    return child
  }

  const childString = child as string

  const specialTokensRegex = /(^#|#)([a-z0-9@/]+)/g
  const matches = childString.matchAll(specialTokensRegex)
  const updatedChildren: (JSX.Element | string)[] = []

  let lastIndex = 0

  for (const match of matches) {
    const fullMatch = match[0]
    const tagText = match[2]
    if (lastIndex !== match.index) {
      updatedChildren.push(childString.substring(lastIndex, match.index))
    }
    updatedChildren.push(<HashTag key={uuidv4()} text={tagText} />)
    lastIndex = match.index + fullMatch.length
  }

  if (lastIndex < childString.length) {
    updatedChildren.push(childString.substring(lastIndex))
  }

  return updatedChildren
}
