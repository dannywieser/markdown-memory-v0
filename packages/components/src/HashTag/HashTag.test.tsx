import { asMock } from '@markdown-memory/testing-support'
import { render, screen } from '@testing-library/react'

import HashTag from './HashTag'
import useStyles from './HashTag.styles'

jest.mock('./HashTag.styles')

beforeEach(() => {
  asMock(useStyles).mockReturnValue({
    hashtag: 'hashtag',
  })
})

describe('the HashTag component', () => {
  test('renders a hashtag ', () => {
    render(<HashTag text="testing" />)
    screen.getByText('#')
    screen.getByText('testing')
  })
})
