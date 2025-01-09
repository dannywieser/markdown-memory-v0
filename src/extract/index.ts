import { copyBearDatabase, dailyJSON, getOnThisDayNotes } from '../bear'
import { startup } from '../utils'

const runExtractor = async () => {
  startup('Bear DB Extractor')
  const dbFile = copyBearDatabase()
  const onThisDay = await getOnThisDayNotes(dbFile)
  console.log(onThisDay)
  dailyJSON(JSON.stringify(onThisDay, null, 2))
}

runExtractor()
