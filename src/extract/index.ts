import { copyBearDatabase, dailyJSON, getOnThisDayNotes } from '../bear'
import { info, startup } from '../utils'

const runExtractor = async () => {
  startup('Bear DB Extractor')
  const dbFile = await copyBearDatabase()
  const dailyNotes = await getOnThisDayNotes(dbFile)
  info(`Entries on this Day: ${dailyNotes?.length}`)
  dailyJSON(JSON.stringify(dailyNotes, null, 2))
}

runExtractor()
