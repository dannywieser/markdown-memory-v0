const fill = (length: number, char = ' ') => Array(length).fill(char).join('')
export const header1 = (headerText: string) =>
  console.info(`# ${headerText}\n${fill(headerText.length + 2, '-')}`)
export const header2 = (headerText: string) =>
  console.info(`## ${headerText} -\n${fill(headerText.length + 3, '-')}`)
export const activity = (activityText: string, indent = 0) =>
  console.info(`${fill(indent, '.')} ${activityText}`)
