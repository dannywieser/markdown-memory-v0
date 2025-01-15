import schedule from 'node-schedule'

import { copyBearDatabase, dailyJSON, getOnThisDayNotes } from '../bear'
import { info, startup } from '../utils'

const runExtractor = async () => {
  startup('Bear DB Extractor')
  const dbFile = await copyBearDatabase()
  const dailyNotes = await getOnThisDayNotes(dbFile)
  info(`Entries on this Day: ${dailyNotes?.length}`)
  dailyJSON(JSON.stringify(dailyNotes, null, 2))
  info(`Run Complete`)
}

schedule.scheduleJob('00 4 * * *', runExtractor)

// always run once right away
runExtractor()
