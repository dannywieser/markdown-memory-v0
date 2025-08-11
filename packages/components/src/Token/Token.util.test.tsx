import { processChildForSpecialTokens } from './Token.util'

jest.mock('../HashTag/HashTag', () => ({
  HashTag: () => 'Hashtag',
}))

describe('the processChildForSpecialTokens function', () => {
  test('foo', () => {
    const children = ['a', 'b', '#foo']
    const result = processChildForSpecialTokens(children)
    console.log(result)
  })
})
