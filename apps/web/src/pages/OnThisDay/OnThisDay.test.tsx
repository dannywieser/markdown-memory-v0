import { Note, NoteProps } from '@markdown-memory/components'
import { asMock } from '@markdown-memory/testing-support'
import { currentDateNoYear } from '@markdown-memory/utilities/date'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { useParams } from 'react-router'

import useNotesOnDayByGroup from '../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup'
import OnThisDay from './OnThisDay'

jest.mock('react-router')
jest.mock('../../hooks/useNotesOnDayByGroup/useNotesOnDayByGroup')
jest.mock('@markdown-memory/components')
jest.mock('@markdown-memory/utilities/date')

describe('the On This Day page', () => {
  beforeEach(() => {
    asMock(currentDateNoYear).mockReturnValue('curDate')
    asMock(useNotesOnDayByGroup).mockReturnValue({
      data: [
        {
          groupName: 'a',
          notes: [
            { id: 'note1', title: 'note1' },
            { id: 'note2', title: 'note2' },
          ],
        },
      ],
    })
    asMock(Note).mockImplementation(({ note }: NoteProps) => (
      <div>{note.title}</div>
    ))
    asMock(useParams).mockReturnValue({ groupName: 'a' })
    jest.clearAllMocks()
  })
  test('renders a loading state while the query is pending', () => {
    asMock(useNotesOnDayByGroup).mockReturnValue({
      data: [],
      pending: true,
    })
    render(<OnThisDay />)

    screen.getByText('loading')
  })

  test('renders a Note component for each result', () => {
    render(<OnThisDay />)

    screen.getByText('note1')
    screen.getByText('note2')
  })

  test('invokes the useNotesOnDayByGroup hook with the correct props', () => {
    render(<OnThisDay />)

    expect(useNotesOnDayByGroup).toHaveBeenCalledWith({
      day: 'curDate',
      groups: ['a'],
    })
  })
})
