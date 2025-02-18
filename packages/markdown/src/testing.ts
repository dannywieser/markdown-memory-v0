import { startup } from '../utils'
import processMarkdownBody from './processMarkdownBody'

const format =
  'foo **bolded text** notcode `code` more not code *italicized text*'

const link =
  'foo bar baz [link title](http://href) bing blah bang [link two](http://href2)'

const list = '* item 1\n* item 2\n* item 3 [link title](http://href)'

const headers = '# header 1\n## header 2\n### header 3 '

const codeblock = '```\nline 1\nline 2\nline 3\n```'

const result = (title: string, res: unknown) => {
  startup(title)
  console.log(JSON.stringify(res, null, 2))
}

result('format', processMarkdownBody(format))

result('link', processMarkdownBody(link))

result('list', processMarkdownBody(list))

result('headers', processMarkdownBody(headers))

result('codeblock', processMarkdownBody(codeblock))
