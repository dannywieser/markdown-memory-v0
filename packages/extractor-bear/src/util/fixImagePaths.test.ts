import { BearProcessedFile } from '../types'
import fixImagePaths from './fixImagePaths'

const rawTextNoImages = 'this is some markdown text with no images.'
const rawTextWithImage = 'this is some text with an inline image ![](a.jpg).'
const rawTextWithTwoImages =
  'this is some text with an inline image ![](a.jpg). And yet another image ![](b.jpg). And then some text after that image!'

const noteFiles = [
  { filename: 'a.jpg', fileId: 'pathtoa' },
  { filename: 'b.jpg', fileId: 'pathtob' },
] as BearProcessedFile[]

describe('the fixImagePaths utility', () => {
  test('gracefully handles scenario with no raw text or images', () => {
    const result = fixImagePaths('', [])
    expect(result).toBe('')
  })

  test('raw text exists but contains no images', () => {
    const result = fixImagePaths(rawTextNoImages, [])
    expect(result).toBe(rawTextNoImages)
  })

  test('text is unchanged if no matching images passed in the noteFiles array', () => {
    const result = fixImagePaths(rawTextWithImage, [])
    expect(result).toBe(rawTextWithImage)
  })

  test('single image, path updated based on matching noteFile image', () => {
    const result = fixImagePaths(rawTextWithImage, noteFiles)
    expect(result).toContain('![](pathtoa/a.jpg)')
  })
  test('two images, path updated based on matching noteFile image', () => {
    const result = fixImagePaths(rawTextWithTwoImages, noteFiles)
    expect(result).toContain('![](pathtoa/a.jpg)')
    expect(result).toContain('![](pathtob/b.jpg)')
  })
})
