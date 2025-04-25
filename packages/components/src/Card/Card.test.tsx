import { asMock } from '@markdown-memory/testing-support'
import { render, screen } from '@testing-library/react'

import useStylesText from '../Text/Text.styles'
import Card from './Card'
import useStyles from './Card.styles'

jest.mock('./Card.styles')
jest.mock('../Text/Text.styles')

beforeEach(() => {
  asMock(useStyles).mockReturnValue({
    cardBase: 'cardBase',
    cardLink: 'cardLink',
  })
  asMock(useStylesText).mockReturnValue({})
})

describe('the Card component', () => {
  test('renders a normal card when no href provided', () => {
    render(<Card title="this is the title">this is the content</Card>)

    screen.getByRole('heading', { level: 2, name: 'this is the title' })
    screen.getByText('this is the content')
    const link = screen.queryByRole('link')
    expect(link).toBeNull()
  })

  test('renders a linked card when href provided', () => {
    render(
      <Card href="/path/to/route" title="this is the title">
        this is the content
      </Card>
    )

    screen.getByRole('heading', { level: 2, name: 'this is the title' })
    screen.getByText('this is the content')
    screen.getByRole('link')
  })

  test('adds the correct class to the card when no href is provided', () => {
    render(<Card title="this is the title">this is the content</Card>)
    const root = screen.getByTestId('card')
    expect(root.className).toBe('cardBase')
  })

  test('adds the correct class to the card when an href is provided', () => {
    render(
      <Card href="foo" title="this is the title">
        this is the content
      </Card>
    )
    const root = screen.getByTestId('card')
    expect(root.className).toBe('cardLink')
  })
})
