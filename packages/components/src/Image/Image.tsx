import { ImageProps } from './Image.types'

export default function Token({ href }: ImageProps) {
  const imageUrl = `images/display?path=${href}&op=noop`
  return <img src={imageUrl} alt="" />
}
