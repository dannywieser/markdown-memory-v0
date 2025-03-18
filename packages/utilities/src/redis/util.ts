export const KEY_SEPARATOR = ':'
export const cacheKey = (prefix: string, id: string) =>
  `${prefix}${KEY_SEPARATOR}${id}`
