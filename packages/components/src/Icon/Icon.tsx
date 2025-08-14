import * as Icons from 'lucide-react'
import { Icon as ChakraIcon } from '@chakra-ui/react'
import type { IconProps as ChakraIconProps } from '@chakra-ui/react'

import { IconProps } from './Icon.types'

const IconMap = Icons as unknown as {
  [key: string]: Icons.LucideIcon | undefined
}

export default function Icon(props: IconProps & ChakraIconProps) {
  const { name } = props

  const testId = `Icon${name}`
  const MappedIcon = IconMap[name]
  return MappedIcon ? (
    <ChakraIcon {...props}>
      <MappedIcon data-testid={testId} />
    </ChakraIcon>
  ) : null
}
