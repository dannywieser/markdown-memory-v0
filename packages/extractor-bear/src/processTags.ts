// import { BearNoteTagRel, BearProcessedTag, BearRawTag } from './types'

// const processNoteTags = (
//   { Z_PK }: BearRawTag,
//   noteTagRel: BearNoteTagRel[]
// ) => {
//   const match = noteTagRel.filter(({ Z_13TAGS: tagId }) => tagId === Z_PK)
//   return match.reduce(
//     (noteIds: number[], { Z_5NOTES: noteId }: BearNoteTagRel) => [
//       ...noteIds,
//       noteId,
//     ],
//     []
//   )
// }

// export default function processTags(
//   tag: BearRawTag,
//   noteTagRel: BearNoteTagRel[]
// ): BearProcessedTag {
//   return {
//     icon: tag.ZTAGCON,
//     noteIds: processNoteTags(tag, noteTagRel),
//     title: tag.ZTITLE,
//   }
// }
