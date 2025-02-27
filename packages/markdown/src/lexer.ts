import { CustomTokensList } from './types'
import { lexer as markdownLexer } from 'marked'

export function lexer(rawMarkdown: string): CustomTokensList {
  // TODO: internal links not working
  return markdownLexer(rawMarkdown)
}
