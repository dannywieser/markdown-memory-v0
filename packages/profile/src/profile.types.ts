import { Group } from './groups'

export interface Profile {
  groups?: Group[]
  timezone: string
}
