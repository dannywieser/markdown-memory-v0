import { Note } from '@markdown-memory/components'
import React from 'react'
import { useParams } from 'react-router'

import { useNote } from '@markdown-memory/services'

export default function NotePage() {
  const { noteId } = useParams()
  const { data: noteData } = useNote(noteId)
  if (!noteData) {
    return null
  }

  return <Note note={noteData} suppressHeader={true} />
}
