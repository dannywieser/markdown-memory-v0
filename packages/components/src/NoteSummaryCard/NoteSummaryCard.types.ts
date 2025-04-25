import { MarkdownNote } from '@markdown-memory/markdown'

export interface NoteSummaryCardProps {
  cardName: string
  href: string
  notes: MarkdownNote[] | undefined
}
