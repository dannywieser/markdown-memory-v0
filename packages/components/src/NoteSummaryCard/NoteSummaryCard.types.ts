import { MarkdownNote } from '@markdown-memory/markdown'

export interface NoteSummaryCardProps {
  cardName: string
  href: string
  icon?: string
  notes: MarkdownNote[] | undefined
}
