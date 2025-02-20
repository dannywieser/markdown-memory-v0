import schedule from 'node-schedule'
import { loadEnv, logserve, info } from '@markdown-memory/utilities'
import bearExtractor from '@markdown-memory/extractor-bear'
import fileExtractor from '@markdown-memory/extractor-file'
export const extractorMap = {
  bear: bearExtractor,
  file: fileExtractor,
}

// default schedule if no config is provided: every 5 minutes
const defaultSchedule = '*/5 * * * *'

export const startup = async () => {
  const {
    EXTRACTOR_TYPE: extractorType = 'bear',
    EXTRACTOR_SCHEDULE: scheduleConfig = defaultSchedule,
  } = loadEnv()

  const extractor = extractorMap[extractorType]
  // setup extractor for configured scheduled runs
  logserve(`markdown memory: extractor`)
  info(`mode: ${extractorType}`)
  info(`schedule: ${scheduleConfig}`)

  schedule.scheduleJob(scheduleConfig, extractor)
  // always run once on startup
  extractor()
}

startup()
