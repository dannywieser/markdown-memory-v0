export interface Frequency {
  count: number
  value: string
}

export function countFrequenciesInArray(arr: string[]): Frequency[] {
  const freqMap: Record<string, number> = {}
  arr.forEach((str) => {
    freqMap[str] = (freqMap[str] || 0) + 1
  })
  return Object.entries(freqMap).map(([value, count]) => ({ count, value }))
}
