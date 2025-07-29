export interface DateCreatedAndModified {
  createdCount: number
  modifiedCount: number
}

export type DateMap = { [key: string]: DateCreatedAndModified }

export interface Stats {
  dateMap: DateMap
  totalEntries: number
  totalTags: number
}
