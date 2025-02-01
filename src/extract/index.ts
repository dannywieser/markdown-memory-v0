import { BearProcessedNote } from 'bear/types'
import schedule from 'node-schedule'

import { copyBearDatabase } from '../bear/copy'
import { processNotes } from '../bear/processNotes'
import { currentDate, error, info, removeYear, startup } from '../utils'
import { saveJSON } from '../utils/saveJSON'

const notesDir = './public/notes'
const dailyDir = './public/daily'

const runExtractor = async () => {
  startup('Bear DB Extractor')
  const dbFile = await copyBearDatabase()

  // 1. retrieve all notes, mapped into BearProcessedNote[]
  const allNotes = await processNotes(dbFile)

  if (!allNotes) {
    error('no notes found')
    return
  }

  // 2. write all notes to files
  allNotes.forEach((note) => {
    const filename = `${notesDir}/${note.id}.json`
    saveJSON(filename, JSON.stringify(note, null, 2))
  })

  // 3. create a set of daily notes
  const date = currentDate()
  const targetDay = removeYear(date)
  const onThisDay = allNotes?.filter((record: BearProcessedNote) => {
    const createdDay = removeYear(record.created)
    return createdDay === targetDay || record.rawText.includes(targetDay)
  })

  const onThisDayIds: string[] = onThisDay.reduce(
    (ids: string[], { id }: BearProcessedNote) => [...ids, id],
    []
  )

  const dailyFile = `${dailyDir}/${date}.json`
  saveJSON(dailyFile, JSON.stringify(onThisDayIds, null, 2))
  info(`${date}: ${onThisDayIds.length} notes`)
}

// run the job every hour
schedule.scheduleJob('00 * * * *', runExtractor)

// always run once right away
runExtractor()
