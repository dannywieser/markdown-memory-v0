import { asMock } from '@markdown-memory/testing-support'
import { render, screen } from '@testing-library/react'
import { ReactNode } from 'react'

import Text from './Text'
import useStyles from './Text.styles'
import { processChildForSpecialTokens } from './Text.util'

jest.mock('./Text.styles')
jest.mock('./Text.util')

beforeEach(() => {
  asMock(useStyles).mockReturnValue({
    base: 'base',
    h1: 'h1',
    text: 'text',
  })
  asMock(processChildForSpecialTokens).mockImplementation(
    (child: ReactNode | ReactNode[] | string) => child
  )
})

describe('the Text component', () => {
  test('renders normal text', () => {
    render(<Text variant="text">test</Text>)
    screen.getByText('test')
  })

  test('classnames added to Text element are passed through to child', () => {
    render(
      <Text className="additionalStyles" variant="text">
        test
      </Text>
    )
    const element = screen.getByText('test')
    expect(element.className).toBe('additionalStyles base text')
  })

  test('classnames added based on element variant', () => {
    render(<Text variant="h1">test</Text>)
    const element = screen.getByRole('heading')
    expect(element.className).toBe('base h1')
  })

  test('codespan variants renders as a span', () => {
    render(<Text variant="codespan">test</Text>)
    const element = screen.getByText('test')
    expect(element.nodeName).toBe('SPAN')
  })

  test('escape variants renders as a span', () => {
    render(<Text variant="escape">test</Text>)
    const element = screen.getByText('test')
    expect(element.nodeName).toBe('SPAN')
  })

  test('when no variant is provided, default to "text"', () => {
    render(<Text>test</Text>)
    const element = screen.getByText('test')
    expect(element.nodeName).toBe('SPAN')
    expect(element.className).toBe('base text')
  })
})
