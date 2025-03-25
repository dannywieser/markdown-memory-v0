import { asMock } from '@markdown-memory/testing-support'
import { render, screen } from '@testing-library/react'

import Text from '../Text/Text'
import AppHeader from './AppHeader'
import useStyles from './AppHeader.styles'

jest.mock('./AppHeader.styles')
jest.mock('../Text/Text')

describe('AppHeader', () => {
  beforeEach(() => {
    asMock(useStyles).mockReturnValue({ root: 'root', title: 'title' })
    asMock(Text).mockImplementation(
      ({ children, variant, className }) =>
        `${variant}:${className}:${children.toString()}`
    )
  })

  test('Renders an h1 element with the correct variant, classes and text', () => {
    render(<AppHeader title="testing" />)
    expect(true).toBe(true)

    screen.getByText('h1:title:testing')
  })
})
