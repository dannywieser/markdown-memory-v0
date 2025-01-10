import { getAllNotes } from 'src/bear/getAllNotes'

import { copyBearDatabase, dailyJSON } from '../bear'
import { startup } from '../utils'

const runExtractor = async () => {
  startup('Bear DB Extractor')
  const dbFile = copyBearDatabase()
  const allNotes = await getAllNotes(dbFile)
  dailyJSON(JSON.stringify(allNotes, null, 2))
}

runExtractor()
