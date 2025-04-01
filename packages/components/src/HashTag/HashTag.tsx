import useStyles from './HashTag.styles'
import { HashTagProps } from './HashTag.types'

const HASH_SYMBOL = '#'

export default function HashTag({ text }: HashTagProps) {
  const { content, hashtag, symbol } = useStyles()
  return (
    <span className={hashtag}>
      <span className={symbol}>{HASH_SYMBOL}</span>
      <span className={content}>{text}</span>
    </span>
  )
}
