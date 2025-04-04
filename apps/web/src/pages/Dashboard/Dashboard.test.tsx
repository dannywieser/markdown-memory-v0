import {
  NoteSummaryCard,
  NoteSummaryCardProps,
} from '@markdown-memory/components'
import { asMock } from '@markdown-memory/testing-support'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import { render, screen } from '@testing-library/react'
import React from 'react'

import useNotesForDay from '../../hooks/useNotesOnDay/useNotesOnDay'
import Dashboard from './Dashboard'
import useStyles from './Dashboard.styles'

jest.mock('./Dashboard.styles')
jest.mock('../../hooks/useNotesOnDay/useNotesOnDay')
jest.mock('@markdown-memory/components')
jest.mock('@markdown-memory/utilities/date')

describe('the Dashboard page', () => {
  beforeEach(() => {
    asMock(currentDateNoYear).mockReturnValue('curDate')
    asMock(useStyles).mockReturnValue({})
    asMock(useNotesForDay).mockReturnValue({ data: [] })
    asMock(NoteSummaryCard).mockImplementation(
      ({ cardName, href }: NoteSummaryCardProps) => (
        <div>
          {cardName}|{href}
        </div>
      )
    )
    jest.clearAllMocks()
  })
  test('renders a NoteSummaryCard for each group defined, with the correct name and href', () => {
    render(<Dashboard />)

    screen.getByText('on this day|personal|on-this-day/personal')
    screen.getByText('on this day|work|on-this-day/work')
  })

  test('invokes the useNotesForDay hook with the correct props', () => {
    render(<Dashboard />)

    expect(useNotesForDay).toHaveBeenCalledTimes(2)
    expect(useNotesForDay).toHaveBeenCalledWith({
      day: 'curDate',
      groupName: 'personal',
    })
    expect(useNotesForDay).toHaveBeenCalledWith({
      day: 'curDate',
      groupName: 'work',
    })
  })
})
