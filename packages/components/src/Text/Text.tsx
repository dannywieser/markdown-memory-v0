import useStyles from './Text.styles'
import { TextProps } from './Text.types'

export default function Text(props: TextProps) {
  const { variant = 'text', children, className } = props

  const spanVariants = ['text', 'codespan', 'escape']
  const Tag = spanVariants.includes(variant) ? 'span' : variant

  const styles = useStyles()

  const classes = [className, styles.base, styles[variant]]
    .filter(Boolean)
    .join(' ')

  return <Tag className={classes}>{children}</Tag>
}
