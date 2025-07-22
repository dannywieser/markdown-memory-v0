import { lexer as markdownLexer } from 'marked'

import { CustomTokensList } from './types'

export function lexer(rawMarkdown: string): CustomTokensList {
  return markdownLexer(rawMarkdown)
}
