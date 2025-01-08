import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

const driver = sqlite3.Database
export const openDB = async (filename: string) => open({ driver, filename })
