const openNoteUrl = 'bear://x-callback-url/open-note'
export const generateExternalUrl = (noteId: string) =>
  `${openNoteUrl}?id=${noteId}&&show_window=yes&open_note=yes`
