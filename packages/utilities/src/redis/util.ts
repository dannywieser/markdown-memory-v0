export const KEY_SEPARATOR = ':'
export const cacheKey = (prefix: string | string[], id: string) => {
  const prefixArr = Array.isArray(prefix) ? prefix : [prefix]

  return [...prefixArr, id].filter(Boolean).join(KEY_SEPARATOR)
}
