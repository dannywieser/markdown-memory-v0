import Text from '../Text/Text'
import useStyles from './Code.styles'
import { CodeProps } from './Code.types'

export default function Code({ code }: CodeProps) {
  const { pre } = useStyles()
  return (
    <pre className={pre}>
      <Text variant="code">{code}</Text>
    </pre>
  )
}
