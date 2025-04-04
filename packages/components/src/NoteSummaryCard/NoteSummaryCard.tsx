import Card from '../Card/Card'
import Text from '../Text/Text'
import useStyles from './NoteSummaryCard.styles'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, notes, href } = props
  const styles = useStyles()

  // TODO: handle no notes more gracefully
  if (!notes) {
    return null
  }

  return (
    <Card href={href} title={cardName}>
      <Text variant="em">{notes.length} notes</Text>
      <ul className={styles.list}>
        {notes.map(({ title, id }) => (
          <li>
            <Text key={id}>{title}</Text>
          </li>
        ))}
      </ul>
    </Card>
  )
}
