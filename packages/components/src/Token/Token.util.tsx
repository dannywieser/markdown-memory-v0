import { JSX, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

import HashTag from '../HashTag/HashTag'
import { Mark } from '@chakra-ui/react'

export interface MatchRule {
  type: string
  regex: RegExp
  getText: (match: RegExpMatchArray) => string
}

type TextMatch = {
  type: string
  index: number
  length: number
  text: string
}

const matchRules = [
  {
    type: 'hashtag',
    regex: /(^#|#)([a-z0-9@/]+)/g,
    getText: (match: RegExpMatchArray) => match[2],
  },
]

const createMatchRules = (searchTerm: string): MatchRule[] => {
  const searchRuleExists = matchRules.some(({ type }) => type === 'searchterm')
  if (searchTerm && !searchRuleExists) {
    matchRules.push({
      type: 'searchterm',
      regex: new RegExp(searchTerm, 'gi'),
      getText: (match: RegExpMatchArray) => match[0],
    })
  }
  return matchRules
}

const getMatches = (targetString: string, rules: MatchRule[]) => {
  const allMatches: TextMatch[] = []
  rules.forEach(({ type, regex, getText }) => {
    for (const match of targetString.matchAll(regex)) {
      allMatches.push({
        type,
        index: match.index ?? 0,
        length: match[0].length,
        text: getText(match),
      })
    }
  })
  return allMatches.sort((a, b) => a.index - b.index)
}

/**
 * When we reach the final string child for a text component, this function will parse that string
 * for any special tokens included in it.
 *
 * Any matching tokens will be replaced with updated JSX that renders those tokens via the corresponding component.
 */
export function processChildForSpecialTokens(
  child: ReactNode | ReactNode[] | string,
  searchTerm = ''
) {
  // if child is not a string, don't parse for tags

  if (typeof child !== 'string') {
    return child
  }
  console.log('child', child)

  // build the ruleset and find matches in the current child string
  const childString = child as string
  const rules = createMatchRules(searchTerm)
  const matches = getMatches(childString, rules)

  // iterate through matches and do replacements
  const updatedChildren: (JSX.Element | string)[] = []
  let lastIndex = 0
  for (const { index, type, text, length } of matches) {
    if (lastIndex !== index) {
      updatedChildren.push(childString.substring(lastIndex, index))
    }

    if (type === 'hashtag') {
      updatedChildren.push(<HashTag key={uuidv4()} text={text} />)
    }
    if (type === 'searchterm') {
      updatedChildren.push(
        <Mark variant={'subtle'} colorPalette="yellow">
          {text}
        </Mark>
      )
    }

    lastIndex = index + length
  }

  // If there is more parts to the string after the match, add it back on
  if (lastIndex < childString.length) {
    updatedChildren.push(childString.substring(lastIndex))
  }

  return updatedChildren
}
