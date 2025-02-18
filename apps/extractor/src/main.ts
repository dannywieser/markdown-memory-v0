import schedule from 'node-schedule'

function runExtractor() {
  console.info(`extractor`)
}

// TODO: configuration for frequency
schedule.scheduleJob('* * * * *', runExtractor)

// always run once right away
runExtractor()
