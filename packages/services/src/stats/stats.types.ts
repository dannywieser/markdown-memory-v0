export interface DateCreatedAndModified {
  createdCount: number
  modifiedCount: number
}

export interface Stats {
  entriesByDay: { [key: string]: DateCreatedAndModified }
  totalEntries: number
  totalTags: number
}
