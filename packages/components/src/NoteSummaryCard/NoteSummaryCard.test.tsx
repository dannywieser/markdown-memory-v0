import { MarkdownNote } from '@markdown-memory/markdown'
import { asMock } from '@markdown-memory/testing-support'
import { render, screen } from '@testing-library/react'

import useStylesCard from '../Card/Card.styles'
import useStylesText from '../Text/Text.styles'
import NoteSummaryCard from './NoteSummaryCard'
import useStyles from './NoteSummaryCard.styles'

jest.mock('./NoteSummaryCard.styles')
jest.mock('../Card/Card.styles')
jest.mock('../Text/Text.styles')

beforeEach(() => {
  asMock(useStyles).mockReturnValue({})
  asMock(useStylesCard).mockReturnValue({})
  asMock(useStylesText).mockReturnValue({})
})

const mockNotes = () => {
  return [
    { id: 'a', title: 'notea' },
    { id: 'b', title: 'noteb' },
  ] as MarkdownNote[]
}

describe('the NoteSummaryCard component', () => {
  test('displays a message if the note array passed in is empty', () => {
    const notes: MarkdownNote[] = []
    render(<NoteSummaryCard cardName="test" href="/test" notes={notes} />)
    screen.getByText('No notes on this day!')
  })

  test('renders the number of notes and the title of each note', () => {
    const notes = mockNotes()
    render(<NoteSummaryCard cardName="test" href="/test" notes={notes} />)
    screen.getByText(`${notes.length} notes on this day`)
    screen.getByText(notes[0].title)
    screen.getByText(notes[1].title)
  })
})
