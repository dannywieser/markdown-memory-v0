import HashTag from '../HashTag/HashTag'
import { processChildForSpecialTokens } from './Token.util'
import { v4 as uuidv4 } from 'uuid'

jest.mock('../HashTag/HashTag', () => ({
  HashTag: (props: any) => 'HashTag',
}))
jest.mock('@chakra-ui/react', () => ({
  Mark: () => 'Mark',
}))
jest.mock('uuid', () => ({
  v4: () => 'uuid',
}))

describe('processChildForSpecial Tokens', () => {
  test('returns original child if not a string', () => {
    const child = <span>hello</span>
    expect(processChildForSpecialTokens(child)).toBe(child)
  })

  test('returns original array if not a string', () => {
    const children = [<span>a</span>, <span>b</span>]
    expect(processChildForSpecialTokens(children)).toBe(children)
  })

  test('returns string unchanged if no tokens', () => {
    expect(processChildForSpecialTokens('hello world')).toEqual(['hello world'])
  })

  test('replaces hashtag with HashTag component', () => {
    const result = processChildForSpecialTokens('foo #bar baz')
    expect(result).toEqual([
      'foo ',
      <HashTag text="bar" key={uuidv4()} />,
      ' baz',
    ])
  })

  test('handles multiple hashtags', () => {
    const result = processChildForSpecialTokens('#foo and #bar')
    expect(result).toEqual([
      <HashTag text="foo" key={uuidv4()} />,
      ' and ',
      <HashTag text="bar" key={uuidv4()} />,
    ])
  })

  test('handles hashtag at start', () => {
    const result = processChildForSpecialTokens('#foo bar')
    expect(result).toEqual([<HashTag text="foo" key={uuidv4()} />, ' bar'])
  })

  test('handles hashtag at end', () => {
    const result = processChildForSpecialTokens('bar #foo')
    expect(result).toEqual(['bar ', <HashTag text="foo" key={uuidv4()} />])
  })
})
