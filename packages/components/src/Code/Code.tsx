import Prism from 'prismjs'
import { useEffect } from 'react'

import { CodeProps } from './Code.types'

export default function Code({ code, language }: CodeProps) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <pre>
      <code className={`language-${language}`}>{code}</code>
    </pre>
  )
}
