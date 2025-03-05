import { asMock } from '@markdown-memory/testing-support'
import { loadEnv } from '@markdown-memory/utilities'
import schedule from 'node-schedule'

import { startup, defaultSchedule, extractorMap } from './startup'

jest.mock('@markdown-memory/extractor-bear')
jest.mock('@markdown-memory/utilities')
jest.mock('node-schedule')

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(jest.fn())
})

describe('the startup function', () => {
  test('defaults configuration if no values passed from env', () => {
    asMock(loadEnv).mockReturnValue({})
    startup()
    expect(schedule.scheduleJob).toHaveBeenCalledWith(
      defaultSchedule,
      expect.any(Function)
    )
    expect(extractorMap.bear).toHaveBeenCalledTimes(1)
  })
})
