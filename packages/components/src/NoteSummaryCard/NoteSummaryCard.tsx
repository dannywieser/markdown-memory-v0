import Card from '../Card/Card'
import Text from '../Text/Text'
import useStyles from './NoteSummaryCard.styles'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, href, notes } = props
  const styles = useStyles()

  const ListNoteTitles = () =>
    notes && (
      <ul className={styles.list}>
        {notes.map(({ id, title }) => (
          <li key={id}>
            <Text>{title}</Text>
          </li>
        ))}
      </ul>
    )

  return (
    <Card href={href} title={cardName}>
      {notes && notes.length === 0 && (
        <Text variant="em">No notes on this day!</Text>
      )}
      <ListNoteTitles />
    </Card>
  )
}
