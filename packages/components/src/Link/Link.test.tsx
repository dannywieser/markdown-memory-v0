import { asMock } from '@markdown-memory/testing-support'
import { render, screen } from '@testing-library/react'

import Text from '../Text/Text'
import Link from './Link'
import useStyles from './Link.styles'

jest.mock('./Link.styles')
jest.mock('../Text/Text')

describe('the Link Component', () => {
  beforeEach(() => {
    asMock(useStyles).mockReturnValue({
      external: 'external',
      internal: 'internal',
    })
    asMock(Text).mockImplementation(({ children }) => children)
  })
  test('renders an anchor tag with the provided props for external links', () => {
    render(<Link children="title" href="/an/external/path" />)

    const link = screen.getByRole('link', { name: 'title' })

    expect(link.getAttribute('href')).toBe('/an/external/path')
    expect(link.getAttribute('class')).toBe('external')
  })

  test('adds the class for internal links to notes with a path of /note', () => {
    render(<Link children="internal link" href="/note/id" />)

    const link = screen.getByRole('link', { name: 'internal link' })

    expect(link.getAttribute('class')).toBe('internal')
  })
})
