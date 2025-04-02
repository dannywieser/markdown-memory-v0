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
      description: 'no hashtags',
      childString: 'this is a string',
      expected: ['this is a string'],
    },
    {
      description: 'single hashtag as only text in the string',
      childString: '#hashtag',
      expected: [<HashTag text="hashtag" key="uuid" />],
    },
    {
      description: 'multiple hashtags',
      childString: '#one #two #three',
      expected: [
        <HashTag text="one" key="uuid" />,
        ' ',
        <HashTag text="two" key="uuid" />,
        ' ',
        <HashTag text="three" key="uuid" />,
      ],
    },
    {
      description: 'mixed text',
      childString: 'one #two three #four five six',
      expected: [
        'one ',
        <HashTag text="two" key="uuid" />,
        ' three ',
        <HashTag text="four" key="uuid" />,
        ' five six',
      ],
    },
  ]

  test.each(cases)('$description', ({ childString, expected }) => {
    const result = processChildForSpecialTokens(childString)
    expect(result).toEqual(expected)
  })
})
