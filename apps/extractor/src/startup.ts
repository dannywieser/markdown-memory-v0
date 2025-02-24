import schedule from 'node-schedule'
import { activity, header1, loadEnv } from '@markdown-memory/utilities'
import { bearExtractor } from '@markdown-memory/extractor-bear'
import fileExtractor from '@markdown-memory/extractor-file'

// extractor implementation map
export const extractorMap = {
  bear: bearExtractor,
  file: fileExtractor,
}

// default schedule if no config is provided: every 5 minutes
export const defaultSchedule = '*/5 * * * *'

export const startup = async () => {
  // load environment config if present
  const {
    EXTRACTOR_TYPE: extractorType = 'bear',
    EXTRACTOR_SCHEDULE: scheduleConfig = defaultSchedule,
  } = loadEnv()

  // setup extractor for configured scheduled runs
  const extractor = extractorMap[extractorType]
  header1('markdown memory: extractor')
  activity(`> mode: ${extractorType}`, 2)
  activity(`> schedule: ${scheduleConfig}`, 2)

  // schedule ongoing runs
  schedule.scheduleJob(scheduleConfig, extractor)

  // always run once on startup
  extractor()
}
