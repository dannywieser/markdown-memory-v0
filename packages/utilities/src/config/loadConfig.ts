import * as fs from 'fs'
import { error } from '../log'
import { Config } from './config.types'

export default async function loadConfig(): Promise<Config | undefined> {
  const { MDM_CONFIG_PATH: configPath = '.' } = process.env

  try {
    const data = await fs.readFileSync(`${configPath}/mdm.json`)
    return JSON.parse(data.toString())
  } catch (e) {
    error('failed to load config')
    console.log(e)
  }
  return undefined
}
