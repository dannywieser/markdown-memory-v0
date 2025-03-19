import { OpenExternalProps } from './OpenExternal.types'

export default function OpenExternal(props: OpenExternalProps) {
  const { source, url } = props

  return <>Open in ${source}</>
}
