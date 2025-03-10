import { TextVariant } from '../Text/Text.types'

export const mapTokenDepthToHeading = (depth: number): TextVariant =>
  `h${depth}` as TextVariant
