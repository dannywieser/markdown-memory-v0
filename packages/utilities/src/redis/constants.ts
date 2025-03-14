// TODO: think of a better place for these
export const NOTE_KEY_PREFIX = 'note'
export const TAGSET_PREFIX = 'tag'
export const NOTETAG_KEY_PREFIX = 'notetag'
const KEY_SEPARATOR = ':'

export const buildKey = (prefix: string, id: string) =>
  `${prefix}${KEY_SEPARATOR}${id}`
