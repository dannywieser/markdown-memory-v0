import Card from '../Card/Card'
import Image from '../Image/Image'
import Text from '../Text/Text'
import useStyles, { imageHeight } from './NoteSummaryCard.styles'
import { NoteSummaryCardProps } from './NoteSummaryCard.types'

export default function NoteSummaryCard(props: NoteSummaryCardProps) {
  const { cardName, href, icon, notes } = props
  const styles = useStyles()

  const files = notes
    ? notes.reduce<string[]>((acc, { filePaths = [] }) => {
        return [...acc, ...filePaths]
      }, [])
    : []

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
      {files && files.length ? (
        <div className={styles.imageStack}>
          {files.map((file) => (
            <div className={styles.image}>
              <Image h={imageHeight} href={file} op="resize" />
            </div>
          ))}
        </div>
      ) : null}
    </Card>
  )
}
