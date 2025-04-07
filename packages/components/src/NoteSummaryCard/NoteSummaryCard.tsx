import Card from '../Card/Card'
import Text from '../Text/Text'
import useStyles from './NoteSummaryCard.styles'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, notes, href } = props
  const styles = useStyles()

  const ListNoteTitles = () =>
    notes && (
      <ul className={styles.list}>
        {notes.map(({ title, id }) => (
          <li key={id}>
            <Text>{title}</Text>
          </li>
        ))}
      </ul>
    )

  const heading =
    notes && notes.length
      ? `${notes.length} notes on this day`
      : 'No notes on this day!'

  return (
    <Card href={href} title={cardName}>
      <Text variant="em">{heading}</Text>
      <ListNoteTitles />
    </Card>
  )
}
