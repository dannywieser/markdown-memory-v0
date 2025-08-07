import { ExternalLink } from 'lucide-react'
import { Tooltip } from 'react-tooltip'

import { OpenExternalProps } from './OpenExternal.types'

export default function OpenExternal(props: OpenExternalProps) {
  const { noteId, source, url } = props
  const tooltipId = `open-external-${noteId}`
  const tooltipText =
    source === 'bear' ? 'Open in Bear' : 'Open in External Editor'

  // TODO: how to use useStyles for the tooltip component?
  return (
    <a
      data-tooltip-content={tooltipText}
      data-tooltip-id={tooltipId}
      href={url}
    >
      <ExternalLink />
      <Tooltip id={tooltipId} />
    </a>
  )
}
