import { asMock } from '@markdown-memory/testing-support'
import { ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'

import HashTag from '../HashTag/HashTag'
import { processChildForSpecialTokens } from './Text.util'

jest.mock('uuid')

beforeEach(() => {
  asMock(uuidv4).mockReturnValue('uuid')
})

describe('the processChildForSpecialTokens function', () => {
  test('no action taken if the passed child is not a string', () => {
    const child = [{}, {}] as ReactNode[]
    const result = processChildForSpecialTokens(child)
    expect(result).toBe(child)
  })

  const cases = [
    {
      childString: 'this is a string',
      description: 'no hashtags',
      expected: ['this is a string'],
    },
    {
      childString: '#hashtag',
      description: 'single hashtag as only text in the string',
      expected: [<HashTag key="uuid" text="hashtag" />],
    },
    {
      childString: '#hashtag@something',
      description: 'hashtag with "@" character ',
      expected: [<HashTag key="uuid" text="hashtag@something" />],
    },
    {
      childString: '#a/b/c',
      description: 'hashtag with "/" character ',
      expected: [<HashTag key="uuid" text="a/b/c" />],
    },
    {
      childString: '#one #two #three',
      description: 'multiple hashtags',
      expected: [
        <HashTag key="uuid" text="one" />,
        ' ',
        <HashTag key="uuid" text="two" />,
        ' ',
        <HashTag key="uuid" text="three" />,
      ],
    },
    {
      childString: 'one #two three #four five six',
      description: 'mixed text',
      expected: [
        'one ',
        <HashTag key="uuid" text="two" />,
        ' three ',
        <HashTag key="uuid" text="four" />,
        ' five six',
      ],
    },
  ]

  test.each(cases)('$description', ({ childString, expected }) => {
    const result = processChildForSpecialTokens(childString)
    expect(result).toEqual(expected)
  })
})
