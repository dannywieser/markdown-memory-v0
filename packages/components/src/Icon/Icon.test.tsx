import { render } from '@testing-library/react'

import Icon from './Icon'

describe('the Icon component', () => {
  test('maps the provided string to a Lucide Icon', () => {
    const result = render(<Icon name="Star" />)
    result.getByTestId('IconStar')
  })

  test('returns an null component if the icon is invalid', () => {
    const { container } = render(<Icon name="foo" />)
    expect(container.innerHTML).toBe('')
  })
})
