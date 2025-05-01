import {
  NoteSummaryCard,
  NoteSummaryCardProps,
} from '@markdown-memory/components'
import { getAllGroupNames } from '@markdown-memory/profile'
import { asMock } from '@markdown-memory/testing-support'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import { render, screen } from '@testing-library/react'
import React from 'react'

import useNotesOnDayByGroup from '../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup'
import Dashboard from './Dashboard'
import useStyles from './Dashboard.styles'

jest.mock('./Dashboard.styles')
jest.mock('../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup')
jest.mock('@markdown-memory/components')
jest.mock('@markdown-memory/utilities/date')
jest.mock('@markdown-memory/profile')

describe('the Dashboard page', () => {
  beforeEach(() => {
    asMock(currentDateNoYear).mockReturnValue('curDate')
    asMock(useStyles).mockReturnValue({})
    asMock(useNotesOnDayByGroup).mockReturnValue({
      data: [
        { groupName: 'a', notes: [] },
        { groupName: 'b', notes: [] },
      ],
    })
    asMock(NoteSummaryCard).mockImplementation(
      ({ cardName, href }: NoteSummaryCardProps) => (
        <div>
          {cardName}|{href}
        </div>
      )
    )
    jest.clearAllMocks()
  })
  test('renders a loading state while the query is pending', () => {
    asMock(useNotesOnDayByGroup).mockReturnValue({
      data: [],
      pending: true,
    })
    render(<Dashboard />)

    screen.getByText('loading')
  })

  test('renders a NoteSummaryCard for each group defined, with the correct name and href', () => {
    render(<Dashboard />)

    screen.getByText('on this day|a|on-this-day/a')
    screen.getByText('on this day|b|on-this-day/b')
  })

  test('invokes the useNotesOnDayByGroup hook with the correct props', () => {
    asMock(getAllGroupNames).mockReturnValue(['a', 'b'])
    render(<Dashboard />)

    expect(useNotesOnDayByGroup).toHaveBeenCalledWith({
      day: 'curDate',
      groups: ['a', 'b'],
    })
  })
})
