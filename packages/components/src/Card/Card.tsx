import Text from '../Text/Text'
import useStyles from './Card.styles'
import { CardProps } from './Card.types'

export default function Card(props: CardProps) {
  const { title, href, children } = props
  const styles = useStyles()

  const CardContent = () => (
    <>
      <Text variant="h2" className={styles.header}>
        {title}
      </Text>
      <div className={styles.content}>{children}</div>
    </>
  )

  const cardStyles = href ? styles.cardLink : styles.cardBase

  return (
    <div className={cardStyles} data-testid="card">
      {href ? (
        <a href={href} className={styles.link}>
          <CardContent />
        </a>
      ) : (
        <CardContent />
      )}
    </div>
  )
}
