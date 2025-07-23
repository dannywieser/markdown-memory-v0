import { bearExtractor } from '@markdown-memory/extractor-bear'
import fileExtractor from '@markdown-memory/extractor-file'
import { activity, header1, loadEnv } from '@markdown-memory/utilities'
import schedule from 'node-schedule'

import writeToCache from './cache/writeToCache'

// extractor implementation map
export const extractorMap = {
  bear: bearExtractor,
  file: fileExtractor,
}

// default schedule if no config is provided: every 5 minutes
export const defaultSchedule = '*/5 * * * *'

const runExtractor = async () => {
  const { EXTRACTOR_TYPE: extractorType = 'bear' } = loadEnv()
  const extractor = extractorMap[extractorType]
  const notes = await extractor()
  if (notes) {
    writeToCache(notes)
  }
}

export const startup = async () => {
  // load environment config if present
  const {
    EXTRACTOR_SCHEDULE: scheduleConfig = defaultSchedule,
    EXTRACTOR_TYPE: extractorType = 'bear',
  } = loadEnv()

  // setup extractor for configured scheduled runs

  header1('markdown memory: extractor')
  activity(`mode: ${extractorType}`, 1)
  activity(`schedule: ${scheduleConfig}`, 1)

  // schedule ongoing runs
  schedule.scheduleJob(scheduleConfig, runExtractor)

  // always run once on startup
  runExtractor()
}
