import useStyles from './Image.styles'
import { ImageProps } from './Image.types'

export default function Image({ href }: ImageProps) {
  const styles = useStyles()
  const imageUrl = `images/display?path=${href}&op=noop`
  return (
    <div className={styles.imageContainer}>
      <img className={styles.centerFit} src={imageUrl} alt="" />
    </div>
  )
}
