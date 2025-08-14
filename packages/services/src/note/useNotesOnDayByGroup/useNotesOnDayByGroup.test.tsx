import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'

import { useNotesOnDayByGroup } from './useNotesOnDayByGroup'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      retryDelay: 1,
    },
  },
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const setupFetchMock = () => {
  const fetchMock = jest.fn()
  fetchMock.mockImplementation((url) =>
    Promise.resolve({ json: jest.fn().mockResolvedValue([{ title: url }]) })
  )

  global.fetch = fetchMock
}

describe('useNotesOnDayByGroup', () => {
  beforeEach(() => {
    setupFetchMock()
  })
  test('no queries are attempted if no groups are provided', () => {
    renderHook(() => useNotesOnDayByGroup({ day: '', groups: [] }), { wrapper })

    expect(fetch).not.toHaveBeenCalled()
  })

  test('runs a query for each group provided', () => {
    renderHook(
      () => useNotesOnDayByGroup({ day: '05.01', groups: ['a', 'b'] }),
      {
        wrapper,
      }
    )

    expect(fetch).toHaveBeenCalledWith('api/notes/groups/a?day=05.01')
    expect(fetch).toHaveBeenCalledWith('api/notes/groups/b?day=05.01')
  })

  test('query results are returned based on group', async () => {
    const {
      result: {
        current: { data, pending },
      },
    } = renderHook(
      () => useNotesOnDayByGroup({ day: '05.01', groups: ['a', 'b'] }),
      {
        wrapper,
      }
    )

    await waitFor(() => expect(pending).toBeFalsy())

    await waitFor(() => {
      expect(data[0]).toEqual({
        day: '05.01',
        groupName: 'a',
        notes: [{ title: 'api/notes/groups/a?day=05.01' }],
      })
      expect(data[1]).toEqual({
        day: '05.01',
        groupName: 'b',
        notes: [{ title: 'api/notes/groups/b?day=05.01' }],
      })
    })
  })
})
