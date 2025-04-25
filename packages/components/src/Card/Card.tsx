import Text from '../Text/Text'
import useStyles from './Card.styles'
import { CardProps } from './Card.types'

export default function Card(props: CardProps) {
  const { children, href, title } = props
  const styles = useStyles()

  const CardContent = () => (
    <>
      <Text className={styles.header} variant="h2">
        {title}
      </Text>
      <div className={styles.content}>{children}</div>
    </>
  )

  const cardStyles = href ? styles.cardLink : styles.cardBase

  return (
    <div className={cardStyles} data-testid="card">
      {href ? (
        <a className={styles.link} href={href}>
          <CardContent />
        </a>
      ) : (
        <CardContent />
      )}
    </div>
  )
}
