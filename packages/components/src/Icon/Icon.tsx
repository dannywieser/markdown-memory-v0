import * as Icons from 'lucide-react'

import { IconProps } from './Icon.types'

const IconMap = Icons as unknown as {
  [key: string]: Icons.LucideIcon | undefined
}

export default function Icon(props: IconProps) {
  const { name } = props

  const testId = `Icon${name}`
  const MappedIcon = IconMap[name]
  return MappedIcon ? <MappedIcon data-testid={testId} /> : null
}
