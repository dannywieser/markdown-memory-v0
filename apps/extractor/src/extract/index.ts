// import { BearProcessedNote } from 'bear/types'
// import schedule from 'node-schedule'

// import { copyBearDatabase } from '../bear/copy'
// import { processNotes } from '../bear/processNotes'
// import { currentDate, error, info, removeYear, startup } from '../utils'
// import { saveJSON } from '../utils/saveJSON'
// import { TagGroup } from './types'

// const notesDir = './public/notes'
// const dailyDir = './public/daily'

// const groups: TagGroup[] = [
//   {
//     includeTags: ['daily@work', 'riverside'],
//     name: 'work',
//   },
//   {
//     excludeTags: ['daily@work', 'riverside'],
//     name: 'personal',
//   },
// ]

// const countTags = (notes: BearProcessedNote[]) => {
//   const allTags: string[] = notes.reduce(
//     (tags: string[], { tags: noteTags }: BearProcessedNote) => [
//       ...tags,
//       ...noteTags,
//     ],
//     []
//   )

//   const tagCounts: { [key: string]: number } = {}
//   for (const tag of allTags) {
//     tagCounts[tag] = tagCounts[tag] ? tagCounts[tag] + 1 : 1
//   }
//   return tagCounts
// }

// const writeGroupDailyFile = (
//   groupName: string,
//   groupNotes: BearProcessedNote[]
// ) => {
//   const date =currentDate()
//   const onThisDayIds: string[] = groupNotes.reduce(
//     (ids: string[], { id }: BearProcessedNote) => [...ids, id],
//     []
//   )

//   const tagCounts = countTags(groupNotes)

//   const dailyJSON = {
//     notes: onThisDayIds,
//     tagCounts,
//   }

//   const dailyFile = `${dailyDir}/${groupName}-${date}.json`
//   saveJSON(dailyFile, JSON.stringify(dailyJSON, null, 2))
//   info(`${groupName}|${date}: ${onThisDayIds.length} notes`)
// }

// const splitByGroup = (notes: BearProcessedNote[]) => {
//   groups.forEach(
//     ({
//       excludeTags: groupExcludeTags,
//       includeTags: groupIncludeTags,
//       name,
//     }) => {
//       // filter out the notes which include tags in the current tag group
//       const removeExcluded = groupExcludeTags
//         ? notes.filter(
//             ({ tags }) => !tags.some((tag) => groupExcludeTags.includes(tag))
//           )
//         : notes
//       const filterIncluded = groupIncludeTags
//         ? removeExcluded.filter(({ tags }) =>
//             tags.some((tag) => groupIncludeTags.includes(tag))
//           )
//         : removeExcluded
//       writeGroupDailyFile(name, filterIncluded)
//     }
//   )
// }

// const runExtractor = async () => {
//   startup('processing notes')
//   const dbFile = await copyBearDatabase()

//   // 1. retrieve all notes, mapped into BearProcessedNote[]
//   const allNotes = await processNotes(dbFile)

//   if (!allNotes) {
//     error('no notes found')
//     return
//   }

//   // 2. write all notes to files
//   allNotes.forEach((note) => {
//     const filename = `${notesDir}/${note.id}.json`
//     saveJSON(filename, JSON.stringify(note, null, 2))
//   })

//   // 3. create a set of daily notes
//   const date = currentDate()
//   const targetDay = removeYear(date)
//   const onThisDay = allNotes?.filter((record: BearProcessedNote) => {
//     const createdDay = removeYear(record.created)
//     return createdDay === targetDay || record.rawText.includes(targetDay)
//   })

//   splitByGroup(onThisDay)
// }

// //startup('Bear DB Extractor')

// // run the job every minute
// schedule.scheduleJob('* * * * *', runExtractor)

// // always run once right away
// runExtractor()

console.log('index')
