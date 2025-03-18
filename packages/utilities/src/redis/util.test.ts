import { cacheKey } from './util'

describe('cacheKey', () => {
  test('creates a cache key given two strings', () => {
    const key = cacheKey('a', 'b')
    expect(key).toEqual('a:b')
  })

  test('creates a cache key given an array and value', () => {
    const key = cacheKey(['a', 'b', 'c'], 'd')
    expect(key).toEqual('a:b:c:d')
  })

  test('ignores blank or null values in the prefix array', () => {
    const undefinedString = undefined as unknown as string
    const key = cacheKey(['a', 'b', '', undefinedString, 'c'], 'd')
    expect(key).toEqual('a:b:c:d')
  })
})
