import { MarkdownNote } from '@markdown-memory/markdown'

import { RedisClient } from './cacheFunctions'
import cacheFunctions from './cacheFunctions'

const setupClientMock = () => {
  return {
    sAdd: jest.fn(),
  } as unknown as RedisClient
}

const setupMarkdownNoteMock = (overrides?: Partial<MarkdownNote>) => {
  return {
    id: 'abc123',
    imagePaths: [],
    ...overrides,
  } as MarkdownNote
}

describe('caching functions', () => {
  describe('cacheImagePathsForGroup', () => {
    test('nothing added to the set if no image paths exist', () => {
      const note = setupMarkdownNoteMock()
      const client = setupClientMock()

      cacheFunctions.cacheImagePathsForGroup(client, note)

      expect(client.sAdd).not.toHaveBeenCalled()
    })

    test('adds image paths to a set with the correct key', () => {
      const note = setupMarkdownNoteMock({ imagePaths: ['a', 'b', 'c'] })
      const client = setupClientMock()

      cacheFunctions.cacheImagePathsForGroup(client, note)

      expect(client.sAdd).toHaveBeenCalledWith('file:abc123', 'a')
      expect(client.sAdd).toHaveBeenCalledWith('file:abc123', 'b')
      expect(client.sAdd).toHaveBeenCalledWith('file:abc123', 'c')
    })
  })
})
