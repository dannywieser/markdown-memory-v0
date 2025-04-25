import { generateExternalUrl } from './generateExternalUrl'
describe('generateExternalUrl', () => {
  test('generates an open not x-callback-url given a note ID', () => {
    const url = generateExternalUrl('a-note-id')

    expect(url).toBe(
      'bear://x-callback-url/open-note?id=a-note-id&&show_window=yes&open_note=yes'
    )
  })
})
