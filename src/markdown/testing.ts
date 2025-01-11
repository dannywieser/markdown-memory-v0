import processMarkdownBody from './processMarkdownBody'

const format =
  'foo **bolded text** notcode `code` more not code *italicized text*'

const link =
  'foo bar baz [link title](http://href) bing blah bang [link two](http://href2)'

processMarkdownBody(format)

processMarkdownBody(link)
