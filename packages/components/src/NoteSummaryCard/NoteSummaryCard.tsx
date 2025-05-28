import Card from '../Card/Card'
import Text from '../Text/Text'
import useStyles from './NoteSummaryCard.styles'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, href, icon, notes } = props
  const styles = useStyles()

  const ListNoteTitles = () =>
    notes && (
      <ul className={styles.list}>
        {notes.map(({ id, title }) => (
          <li className={styles.listitem} key={id}>
            <Text>{title}</Text>
          </li>
        ))}
      </ul>
    )

  return (
    <Card href={href} icon={icon} title={cardName}>
      {notes && notes.length === 0 && <Text variant="em">No notes found</Text>}
      <ListNoteTitles />
    </Card>
  )
}
