import chalk from 'chalk'

const blue = chalk.blueBright
const yellow = chalk.yellowBright
const green = chalk.greenBright

const line = yellow(' --- ')
export const info = (message: string) => console.log(` > ${green(message)}`)
export const log = (message: string) => console.log(blue(message))
export const startup = (message: string) =>
  console.log(`${line}${blue(message)}${line}`)
