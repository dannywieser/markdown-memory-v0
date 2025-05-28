import useStyles from './Image.styles'
import { ImageProps } from './Image.types'

export default function Image({
  centerFit = false,
  h,
  href,
  op = 'noop',
  w,
}: ImageProps) {
  const styles = useStyles()
  const width = w ? `&w=${w}` : ''
  const height = h ? `&h=${h}` : ''
  const imageUrl = `images/display?path=${href}&op=${op}${width}${height}`

  return centerFit ? (
    <div className={styles.imageContainer}>
      <img alt="" className={styles.centerFit} src={imageUrl} />
    </div>
  ) : (
    <img alt="" src={imageUrl} />
  )
}
