import { ExternalLink } from 'lucide-react'

import { OpenExternalProps } from './OpenExternal.types'

export default function OpenExternal(props: OpenExternalProps) {
  const { noteId, source, url } = props
  const tooltipId = `open-external-${noteId}`
  const tooltipText =
    source === 'bear' ? 'Open in Bear' : 'Open in External Editor'

  // TODO: Tooltip
  return (
    <a
      data-tooltip-content={tooltipText}
      data-tooltip-id={tooltipId}
      href={url}
    >
      <ExternalLink />
    </a>
  )
}
