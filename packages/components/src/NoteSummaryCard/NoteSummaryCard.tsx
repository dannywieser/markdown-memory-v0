import Text from '../Text/Text'
import useStyles from './NoteSummaryCard.styles'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, notes } = props
  const styles = useStyles()

  const targetRoute = `on-this-day/${cardName}`

  // TODO: handle no notes more gracefully
  if (!notes) {
    return null
  }

  return (
    <div className={styles.root}>
      <a href={targetRoute} className={styles.link}>
        <Text variant="h2" className={styles.header}>
          {cardName}
        </Text>
        <div className={styles.content}>
          <Text>{notes.length} notes</Text>
          <ul className={styles.list}>
            {notes.map(({ title, id }) => (
              <li>
                <Text key={id}>{title}</Text>
              </li>
            ))}
          </ul>
        </div>
      </a>
    </div>
  )
}
