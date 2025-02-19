import schedule from 'node-schedule'
import { loadConfig, logserve, info } from '@markdown-memory/utilities'
import bearExtractor from '@markdown-memory/extractor-bear'
import fileExtractor from '@markdown-memory/extractor-file'
export const extractorMap = {
  bear: bearExtractor,
  file: fileExtractor,
}

const startup = async () => {
  // default schedule if no config is provided: every 5 minutes
  const defaultSchedule = '*/5 * * * *'
  const { extractorType, schedule: scheduleConfig = defaultSchedule } =
    await loadConfig()

  const extractor = extractorMap[extractorType]
  // setup extractor for configured scheduled runs
  logserve(`markdown memory: extractor start`)
  info(`mode: ${extractorType}`)
  info(`schedule: ${scheduleConfig}`)

  schedule.scheduleJob(scheduleConfig, extractor)
  // always run once on startup
  extractor()
}

startup()
