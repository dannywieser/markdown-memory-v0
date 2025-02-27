import { open } from 'sqlite'
import * as sqlite3 from 'sqlite3'

const driver = sqlite3.Database
export const sqliteOpen = async (filename: string) => open({ driver, filename })
